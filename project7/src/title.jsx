import { useState, useEffect } from "react";

function Title() {
    const [title, setTitle] = useState("Counter");

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div>
            <h2>{title}</h2>

            <button onClick={() => setTitle("Welcome")}>
                Change Title
            </button>
        </div>
    );
}

export default Title;