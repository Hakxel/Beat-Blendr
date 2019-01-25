import ReactOnRails from 'react-on-rails';

import Player from '../bundles/Player/components/Player';
import Tracker from '../bundles/Tracker/components/Tracker';

// This is how react_on_rails can see the Player in the browser.
ReactOnRails.register({
  Player,
  Tracker
});