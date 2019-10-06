import React from 'react'
import PanelItem from './panelItem'

class panelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: 0
    }
  }
  handleClick = (id) => {
    this.setState({
      activeId: id
    })
  }
  render() {
    return(
      <ul>
        {this.props.list.map(item => 
          <PanelItem
            item={item}
            key={item.id}
            activeId={this.state.activeId}
            onItemClick={this.handleClick}/>
        )}
      </ul>
    )
  }
}

export default panelList