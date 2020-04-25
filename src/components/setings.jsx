import React, { Component } from 'react';

const InputColor = ({ id, defaultValue, title }) => {
  return (
    <label htmlFor={id}>
      {title}
      <input
        type="color"
        name={id}
        id={id}
        defaultValue={defaultValue}
        onChange={(e) => {
          document
            .getElementById('slider')
            .style.setProperty(`--${id}`, e.target.value);
        }}
      />
    </label>
  );
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.elemSetting = props.elemSetting;
  }

  render() {
    return (
      <form>
        <div>
          <h3>pager</h3>
          <InputColor
            elemSetting={this.elemSetting}
            id="pager-br-color"
            defaultValue="#003cff"
            title="border color:"
          />
          <InputColor
            elemSetting={this.elemSetting}
            id="pager-bg-color"
            defaultValue="#003cff"
            title="background color:"
          />
        </div>
      </form>
    );
  }
}

export default Settings;
