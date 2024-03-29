import React        from 'react';
import ReactDOM     from 'react-dom';
const _CONTAINER_ID = Symbol('container_id');

/**
 * @class Popup
 */
export default class Popup extends React.Component {

  /**
   * @type {{title: *, url: *, onClosing: *, options: *, window: *, containerId: *}}
   */
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    onClosing: React.PropTypes.func,
    options: React.PropTypes.object,
    window: React.PropTypes.object,
    containerId: React.PropTypes.string,
    children: React.PropTypes.element
  };

  state = {
    openedWindow: null
  };

  defaultOptions = {
    toolbar: 'no',
    location: 'no',
    directories: 'no',
    status: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'yes',
    width: 600,
    height: 800,
    top: (o, w) => ((w.innerHeight - o.height) / 2) + w.screenY,
    left: (o, w) => ((w.innerWidth - o.width) / 2) + w.screenX
  };

  /**
   * @constructs PoppoutWindow
   * @param props
   */
  constructor(props){
    super(props);
    this[_CONTAINER_ID] = props.containerId || 'popout-content-container';
    this.closeWindow = this.closeWindow.bind(this);
  }

  /**
   * Override default id if we get given one
   * @param props
   */
  componentWillReceiveProps(props){
    props.containerId && (this[_CONTAINER_ID] = props.containerId);
  }

  componentWillUnmount(){
    this.closeWindow();
  }

  componentDidMount(){
    let Popup,
        container;

    const options      = Object.assign({}, this.defaultOptions, this.props.options),
          ownerWindow  = this.props.window || window,
          openedWindow = {
            update(newComponent){
              ReactDOM.render(newComponent, container);
            },
            close(){
              Popup && Popup.close();
            }
          };

    if (!ownerWindow) {
      // If we have no owner windows, bail. Likely server side render
      return;
    }

    const createOptions = () => {
      const ret = [];
      for (let key in options){
        options.hasOwnProperty(key) && ret.push(key + '=' + (
            typeof options[key] === 'function' ?
              options[key].call(this, options, ownerWindow) :
              options[key]
          )
        );
      }
      return ret.join(',');
    };

    Popup = ownerWindow.open(this.props.url || 'about:blank', this.props.title, createOptions());

    Popup.onbeforeunload = () =>{
      container && ReactDOM.unmountComponentAtNode(container);
      this.windowClosing();
    };
    // Close any open popouts when page unloads/refeshes
    ownerWindow.addEventListener('unload', this.closeWindow);

    const onloadHandler = () =>{
      if (container){
        if (Popup.document.getElementById(this[_CONTAINER_ID])) return;

        ReactDOM.unmountComponentAtNode(container);
        container = null;
      }

      Popup.document.title = this.props.title;
      container = Popup.document.createElement('div');
      container.id = this[_CONTAINER_ID];
      Popup.document.body.appendChild(container);

      ReactDOM.render(this.props.children, container);
    };

    Popup.onload = onloadHandler;
    // Just in case that onload doesn't fire / has fired already, we call it manually if it's ready.
    Popup.document.readyState === 'complete' && onloadHandler();

    this.setState({openedWindow});
  }

  closeWindow(){
    this.state.openedWindow && this.state.openedWindow.close();
    (this.props.window || window).removeEventListener('unload', this.closeWindow);
  }

  windowClosing(){
    this.props.onClosing && this.props.onClosing();
  }

  /**
   * Bubble changes
   */
  componentDidUpdate(){
    // For SSR we might get updated but there will be no openedWindow. Make sure openedWIndow exists before calling
    this.state.openedWindow && this.state.openedWindow.update(this.props.children);
  }

  render(){
    return <div></div>;
  }

}
