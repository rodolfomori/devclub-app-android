import { registerRootComponent } from 'expo';
import AppProvider from './src/hooks';

import App from './src/containers/Home';

function MyApp() {
  return <AppProvider><App /></AppProvider>;
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(MyApp);
