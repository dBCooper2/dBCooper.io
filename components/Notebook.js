// components/Notebook.js - by mtetik98
import { JupyterNotebookViewer } from "react-jupyter-notebook-viewer";

function Notebook(props) {
	const notebook = new JupyterNotebookViewer(props);
	return <>{notebook}</>;
}

export default Notebook;