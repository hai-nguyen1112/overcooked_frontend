import React from 'react'
import {withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {Image} from 'semantic-ui-react'

const RecipeReminderPopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <Image key={recipe.name} id={recipe.name} className="instruction" alt="instruction" src={recipe.instruction}/>)
  if (props.level.id !== 1) {
    instructionCards.unshift(<Image key="imageinstruction" id="imageinstruction" className="instruction" alt="instruction" src="https://i.ibb.co/dj7C8YM/new-instruction-plate.png"/>)
  }
  return (
    <Popup
      open={props.open}
      modal
    >
    {close => (
    <div className="modal">
      <div className="close" onClick={props.updatePopupRecipeOpenState}>
        &times;
      </div>
      <div className="header">Level {props.level.id} Recipes</div>
      <div className="content">
        {instructionCards}
      </div>
    </div>
  )}
    </Popup>
  )
}

export default withRouter(RecipeReminderPopup)
