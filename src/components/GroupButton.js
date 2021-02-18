const GroupButton = ({ text, url }) => {
    return (
        <button className="btn" style={{ backgroundColor: "gray "}} onClick={() => console.log(url)}>{text}</button>
    )
}

export default GroupButton
