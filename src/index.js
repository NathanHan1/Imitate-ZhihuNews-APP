import dva from 'dva';
import './index.css';
import fastclick from 'fastclick'

// 1. Initialize
const app = dva();

fastclick.attach(document.body)
// 2. Plugins
// app.use();

// 3. Model
app.model(require('./models/latest').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
