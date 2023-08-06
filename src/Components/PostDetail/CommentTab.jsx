import React from "react";

const CommentTab = (props) => {
    const { author, text } = props;
    return (
        <div className='flex flex-col border-2 rounded-lg p-2 my-2'>
            <p>{text}</p>
            <div className="flex flex-col items-end font-light text-sm">
                {/* <p>{date}</p> */}
                <p>{author}</p>
            </div>
        </div>
    );
};

export default CommentTab;
