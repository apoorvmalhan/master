import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        '\nbody {\n  margin: 0;\n  font-family: "Lato", sans-serif;\n}\n\n.sidebar {\n  margin: 0;\n  padding: 0;\n  width: 200px;\n  background-color: #f1f1f1;\n  position: fixed;\n  height: 100%;\n  overflow: auto;\n}\n\n.sidebar a {\n  display: block;\n  color: black;\n  padding: 16px;\n  text-decoration: none;\n}\n \n.sidebar a.active {\n  background-color: #04AA6D;\n  color: white;\n}\n\n.sidebar a:hover:not(.active) {\n  background-color: #555;\n  color: white;\n}\n\n\n@media screen and (max-width: 700px) {\n  .sidebar {\n    width: 100%;\n    height: auto;\n    position: relative;\n  }\n  .sidebar a {float: left;}\n  div.content {margin-left: 0;}\n}\n\n@media screen and (max-width: 400px) {\n  .sidebar a {\n    text-align: center;\n    float: none;\n  }\n}\n'
                }}
            />
            <div className="sidebar">
                <Link to="/">Home</Link>
                {/* <Link to="/news">News</Link>
                <Link to="/contact">To-Do List</Link> */}
                <Link to="/bookform">Book Form</Link>
                <Link to="/booklist">Book List</Link>
                
            </div>
        </>
    )
}
