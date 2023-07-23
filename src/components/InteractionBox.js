import BlackCover from "./BlackCover"
import ElementBox from "./ElementBox"

const InteractionBox = ({ children }) => {
    return(
        <BlackCover>
            <ElementBox>{children}</ElementBox>
        </BlackCover>
    )
}

export default InteractionBox