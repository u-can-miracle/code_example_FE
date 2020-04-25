import * as React from 'react'
import classnames from 'classnames'

interface IProps {
  children: JSX.Element | string,
  title: string,
  value: string,
  isEditable: boolean,
  placeholder: string,
  className: string,
  onBlur: (value: string | number) => void,
  isRequestEnable: boolean
}
interface IState {
  isEditedModeEnable: boolean
  width: number
  value: string | number
  isLoaded: boolean
}

class EditedInput extends React.PureComponent<IProps, IState> {
  // private spanRef: ISpanRef | null
  private spanRef: HTMLSpanElement  | null
  private updateWidthBind: () => {}
  private submitBind: () => {}
  private updateValueBind: () => {}

  constructor(props){
    super(props)

    this.spanRef = null

    this.state = {
      isEditedModeEnable: false,
      width: 0,
      value: props.value,
      isLoaded: false
    }

    this.updateWidthBind = this.updateWidth.bind(this)
    this.submitBind = this.submit.bind(this)
    this.updateValueBind = this.updateValue.bind(this)
  }

  componentWillReceiveProps(nextProps){
    const { isRequestEnable, value } = nextProps

    // strict comparision - isRequestEnable is optional prop not undefined
    if(isRequestEnable === false && this.props.value !== value){
      this.setState(() => ({
        value
      }))
    }
  }

  componentDidMount(){
    this.updateWidth()
    this.setState(() => ({
      isLoaded: true
    }))
  }

  updateWidth(){
    if(!this.spanRef){
      return
    }

    const width = this.spanRef.clientWidth

    this.setState({
      width
    })
  }

  toggleEditMode(){
    this.setState(prevState => ({
      isEditedModeEnable: !prevState.isEditedModeEnable
    }))
  }

  updateValue(ev){
    const value = ev.target.value.replace(/\s\s/,' ')

    this.setState((/* prevProps */) => ({
      value,
    }), () => this.updateWidthBind())
  }

  submit(){
    const { value } = this.state

    this.toggleEditMode()

    if(this.props.onBlur && (value !== this.props.value)) {
      this.props.onBlur(value)
    }
  }

  render(){
    const { isEditedModeEnable, width, isLoaded, value } = this.state
    const { className, placeholder, title, isEditable, children } = this.props

    return (
      <div
        className={classnames(
          className,
          'editable',
          { 'editable--enable': isEditable && isEditedModeEnable },
          { 'editable--loaded': isEditable && isLoaded }
        )}
      >
        {
          title
            &&
          <div
            className="editable--title"
          >
            {title}:
          </div>
        }
        <div className="editable--content">
          <span
            className="editable--text-block"
            // eslint-disable-next-line react/jsx-no-bind
            ref={span => { this.spanRef = span	}}
          >
            {value || placeholder}
          </span>

          {
            isEditable
              &&
            <input
              className="editable--input-block"
              style={{ width: width + 5 }}
              placeholder={placeholder}
              value={value}
              onBlur={this.submitBind}
              onChange={this.updateValueBind}
            />
          }
        </div>
        {children}
      </div>
    )
  }
}

export default EditedInput
