import React, {Component} from 'react'
import CheeseburgerMenu from "cheeseburger-menu";
import HamburgerMenu from "react-hamburger-menu";
import MenuContent from "./MenuContent";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  openMenu() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }
  render(){
    return(
      <div class="hamburger">
        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}>
          <MenuContent closeCallback={this.closeMenu.bind(this)} />
        </CheeseburgerMenu>

        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={this.openMenu.bind(this)}
          width={32}
          height={24}
          strokeWidth={2}
          rotate={0}
          color="white"
          borderRadius={0}
          animationDuration={0.5} />
      </div>
    )
  }
}

export default Navbar
