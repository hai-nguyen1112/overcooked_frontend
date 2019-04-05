import React from 'react'
import {Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const ImageIngredient = props => {
  return (
    <Image src={props.ingredient.image} style={{width: "120px", height: "120px", borderRadius: "4px"}}/>
  )
}

export default withRouter(ImageIngredient)
