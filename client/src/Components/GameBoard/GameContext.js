import React, { useContext, useEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type) => {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { id, x1, y1, x2, y2, type, roughElement };
};
const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === "rectangle") {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;
    return start || end || inside;
  }
};

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const cursorForPosition = (position) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
};

const useHistory = initialState => {
  const [history, setHistory] = useState([initialState]);

  const [index, setIndex] = useState(0)

  const setState = (action, overwrite = false) => {
    const newState = typeof action === "function" ? action(history[index]) : action
    if (overwrite){
      const historyCopy = [...history]
      historyCopy[index] = newState
      setHistory(historyCopy)
    } else {
      const updatedState = [...history.slice(0, index + 1)]
      setHistory([...updatedState, newState])
      setIndex( prevState => prevState + 1)
    }
  }
  const undo = () => index > 0 && setIndex(prevState => prevState - 1)
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1)
  return [history[index], setState, undo, redo]
}



const GameBoardContext = React.createContext();

export const GameBoardProvider = ({ children }) => {

  // GridRef
  const gridCanvasRef = useRef(null);
  const gridContextRef = useRef(null);

  // DrawRef
  const drawCanvasRef = useRef(null);
  const drawContextRef = useRef(null);

  // Map LayerRef
  const mapCanvasRef = useRef(null);
  const mapContextRef = useRef(null);

  // Draw variables
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);
  const [playerTokens, setPlayerTokens] = useState([])

  // Map canvas prep
  const prepareMapCanvas = () => {
    const canvas = mapCanvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    mapContextRef.current = context;
  };

  // Drawing Canvas initialization
  const prepareDrawCanvas = () => {
    const canvas = drawCanvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    drawContextRef.current = context;

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  };

  // Prep GridLayer initialization
  const prepareGridCanvas = () => {
    const canvas = gridCanvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const gridContext = canvas.getContext("2d");
    gridContextRef.current = gridContext;
  };

  // Does as it says, draws a grid.  The s variable essentially defines the size of each square
  const drawGrid = () => {
    let s = 41.555;
    let pL = s;
    let pT = s;
    let pR = s;
    let pB = s;

    gridContextRef.current.strokeStyle = "rgba(0,0,0,.5)";
    gridContextRef.current.beginPath();
    for (let x = pL; x <= gridCanvasRef.current.width - pR; x += s) {
      gridContextRef.current.moveTo(x, pT);
      gridContextRef.current.lineTo(x, gridCanvasRef.current.height - pB);
    }
    for (let y = pT; y <= gridCanvasRef.current.height - pB; y += s) {
      gridContextRef.current.moveTo(pL, y);
      gridContextRef.current.lineTo(gridCanvasRef.current.width - pR, y);
    }

    gridContextRef.current.stroke();
  };

  // Clear Grid.  "Clears" grid by applying a fill style to the whole map.  This needs to changed to just remove the grid, or effectively make the div clear.  Best option would be to draw the backgorund image in this canvas, and on clear just redraw it.  
  const clearGrid = () => {
    const canvas = gridCanvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };


  // Undo/Redo useEffect
  useEffect(() => {
    const undoRedoFunction = event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.key === "y") {
          redo()
        } else {
          undo()
        }
      }
    }
    document.addEventListener("keydown", undoRedoFunction)
    return () => {
      document.removeEventListener("keydown", undoRedoFunction)
    }
  }, [undo, redo])
  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy, true);
  };



  // handles mouseDown events.  Buttons define the tool, which defines the function 
  const handleDrawMouseDown = (Event) => {
    const { clientX, clientY } = Event;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);

      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
        setElements(prevState => prevState)

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resize");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
      setAction("drawing");
    }
  };

  // Mouse Move event.  Takes the tool info, along with the action defined by mousedown event, and draws, selects, etc.
  const handleDrawMouseMove = (Event) => {
    const { clientX, clientY } = Event;

    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      Event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }
    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);

      console.log(clientX, clientY);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;
      updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
    } else if (action === "resize") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };


  // Mouse up event.  Ends any action being performed.  
  const handleDrawMouseUp = () => {
    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (action === "drawing" || action === "resizing") {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }
    }
    setAction("none");
    setSelectedElement(null);
  };


  return (
    <GameBoardContext.Provider
      value={{
        gridCanvasRef,
        gridContextRef,
        drawCanvasRef,
        drawContextRef,
        mapCanvasRef,
        mapContextRef,
        prepareMapCanvas,
        prepareDrawCanvas,
        prepareGridCanvas,
        handleDrawMouseDown,
        handleDrawMouseMove,
        handleDrawMouseUp,
        drawGrid,
        clearGrid,
        setTool,
        tool,
        action,
        setAction,
        elements, 
        setElements,
        selectedElement, 
        setSelectedElement,
        undo,
        redo,
        playerTokens,
        setPlayerTokens,
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};

export const useCanvas = () => useContext(GameBoardContext);
