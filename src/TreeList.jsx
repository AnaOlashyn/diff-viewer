import React from 'react';
import { List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './TreeList.scss';

export class TreeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nodes: this.props.dataList.nodes };
    this.handleClick = this.handleClick.bind(this);
    this.toogleClick = this.toogleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ nodes: nextProps.dataList.nodes });
  }

  handleClick(e, index) {

    this.props.onChangeDisplay(index);

  }

  toogleClick(e, index) {
    this.props.onChangeDisplay2Level(index);
  }

  render() {
    return (
      <div>
        {this.state.nodes !== undefined &&
          (
            <List id="listBlock" as='ol'>
              {Object.keys(this.state.nodes).map((item, index) =>
                (
                  <List.Item as='li' value= "•">
                    <List.Content className = "listItem" onClick={(e) => this.handleClick(e, index)}>
                      {this.state.nodes[item].status !== undefined &&
                        <List.Header id={this.state.nodes[item].status}>{item}</List.Header>
                      }
                      {this.state.nodes[item].status === undefined &&
                        <List.Header id="unchanged">{item}</List.Header>
                      }
                    </List.Content>
                    {this.props.display.indexOf(index) > -1 &&
                      <List.List >
                        {this.state.nodes[item].storage !== undefined &&
                          <List.Item as='li' value= "•">
                            <List.Content>
                              <List.Header className = "listItem" onClick={(e) => this.toogleClick(e, index.toString() + ".1")}>storage</List.Header>
                            </List.Content>
                            {this.props.display2level.indexOf(index.toString() + ".1") > -1 &&
                              <List.List >
                                {Array.isArray(this.state.nodes[item].storage) === false &&
                                  this.state.nodes[item].storage.elements.map(element =>
                                    (
                                      <List.Item as='li' value= " ">
                                        <List.Content>
                                          <List.Header id={element.status}>
                                            {element.name.substring((item + "-storages-").length)}
                                          </List.Header>
                                        </List.Content>
                                      </List.Item>
                                    )
                                  )
                                }
                                {Array.isArray(this.state.nodes[item].storage) &&
                                  this.state.nodes[item].storage.map(element =>
                                    (
                                      <List.Item as='li' value= " ">
                                        <List.Content>
                                          <List.Header>
                                            {element.substring((item + "-storages-").length)}
                                          </List.Header>
                                        </List.Content>
                                      </List.Item>
                                    )
                                  )
                                }
                              </List.List>
                            }
                          </List.Item>
                        }
                        {this.state.nodes[item].interfaces !== undefined &&
                          <List.Item as='li' value= "•">
                            <List.Content>
                              <List.Header className = "listItem" onClick={(e) => this.toogleClick(e, index.toString() + ".2")}>interfaces</List.Header>
                            </List.Content>
                            {this.props.display2level.indexOf(index.toString() + ".2") > -1 &&
                              <List.List>
                                {Array.isArray(this.state.nodes[item].interfaces) === false &&
                                  this.state.nodes[item].interfaces.elements.map(element =>
                                    (
                                      <List.Item as='li' value= " ">
                                        <List.Content>
                                          <List.Header id={element.status}>
                                            {element.name.substring((item + "-snmp-interfaces-").length)}
                                            {element.changes !== undefined &&
                                              <List.List>
                                                <List.Item as='li' value= " ">
                                                  <List.Content>
                                                    <List.Header id ="adress">{element.changes.physAddress.new}</List.Header>
                                                  </List.Content>
                                                </List.Item>
                                              </List.List>
                                            }
                                          </List.Header>
                                        </List.Content>
                                      </List.Item>
                                    )
                                  )
                                }
                                {Array.isArray(this.state.nodes[item].interfaces) &&
                                  this.state.nodes[item].interfaces.map(element =>
                                    (
                                      <List.Item as='li' value= " ">
                                        <List.Content>
                                          <List.Header>
                                            {element.substring((item + "-snmp-interfaces-").length)}
                                          </List.Header>
                                        </List.Content>
                                      </List.Item>
                                    )
                                  )
                                }
                              </List.List>
                            }
                          </List.Item>
                        }
                      </List.List>
                    }
                  </List.Item>
                )
              )}
            </List>
          )}
      </div>
    )
  }
}