import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class Modal extends Component {


    render() {

        return (
        
            <div id="Modal" class=" modal fade Modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="m_Title" style="margin-right:20px"></h3>
                            <a href="Customers/Index" id="btnClose">X</a>
                        </div>

                        <div class="modal-body">
                            <label>Name</label>
                            <br />
                            <div id="error0"></div>
                            <input type="text" id="Name" data_bind="textInput: Name, valueUpdate: 'afterkeydown'" />
                            <br />
                            <br />
                            <br />
                            <label>Address</label>
                            <br />
                            <div id="error1"></div>
                            <input type="text" id="Address" data_bind="textInput: Address, valueUpdate: 'afterkeydown'" />
                            <br />
                        </div>
                        <div class="modal-footer">
                            <input type="submit" value="Save" class="btn btn-primary" id="btnSubmit" />
                            <a href="Customers/Index" class="btn btn-danger" id="btnClose">Close</a>
                        </div>
                    </div>
                </div>
            </div>
               

        )
    }


}
export default Modal;