import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                data: ''
            };
        this.loadData = this.loadData.bind(this);
        this.CreateData = this.CreateData.bind(this);
        this.CloseData = this.CloseData.bind(this);
        this.CloseDelete = this.CloseDelete.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var Id, del_Id;
        $.ajax({
            context: this,
            type: "GET",
            url: "/Stores/GetAllStores",
            success: function (data) {
                $.each(data, function (index, obj) {
                    var ID = obj.ID;
                    var row = '<tr><td> ' + obj.Name + ' </td> <td> ' + obj.Address + ' </td><td> <div><span id="btn_edit" ><a href="#" class="ui yellow button" id="' + obj.ID + '" style="color:white; margin-left:10px"" ><i class="edit icon"></i>Edit</a></span></div></td>' + '<td><div><span id="btn_delete"  ><button class="ui red button" id="' + obj.ID + '"style="color:white; margin-left:10px""><i class="trash icon"></i> Delete</button></span></div></td></tr>';
                    $("#StoreTable tbody").append(row);

                });
                $(document).on('click', '#btn_edit', function (event) {
                    $('#Modal').modal('show');
                    $('.modal-title').text("Edit Record");
                    Id = event.target.id;

                    $.ajax({
                        url: '/Stores/GetStore',
                        method: 'GET',
                        data: { id: Id },
                        success: function (data) {
                            $("#Name").val(data.Name);
                            $("#Address").val(data.Address);

                        },
                        error: function (data) {
                            alert("error");
                        }
                    })

                    $('#m_Title').text("Edit Record");
                    $('#Modal').modal('show');

                });

                $(document).on('click', '#btn_delete', function (event) {
                    var Id = event.target.id;

                    $.ajax({
                        url: '/Stores/GetStore',
                        method: 'GET',
                        data: { ID: Id },
                        success: function (data) {

                            del_Id = Id;  
                        },
                        error: function () {
                            alert("error");
                        }

                    })

                    $('#modal_Title').text("Delete Record");
                    $('#Delete_Modal').modal('show');
                });

                $(document).on("click", "#btnDeleteSubmit", null, function (event) {
                    var Id = del_Id;

                    $.ajax({
                        url: '/Stores/Delete',
                        method: 'POST',
                        data: { ID: Id },
                        success: function () {
                            location.reload();

                        },
                        error: function () {
                            location.reload();
                        }

                    })

                });

                $(document).on("click", "#btnSubmit", null, function (event) {

                    var Name = $("#Name").val();
                    var Address = $("#Address").val();
                    if (Name != '' && Address != '') {

                        if ($('#m_Title').text() === "Create Record") {

                            $.ajax({
                                url: '/Stores/Create',
                                method: 'POST',
                                data: { Name: Name, Address: Address },
                                success: function () {
                                    location.reload();
                                },
                                error: function () {
                                    location.reload();
                                }
                            })
                        }
                        else if ($('#m_Title').text() === "Edit Record") {

                            $.ajax({
                                url: '/Stores/Edit',
                                method: 'POST',
                                data: { ID: Id, Name: Name, Address: Address },
                                success: function () {

                                    location.reload();
                                },
                                error: function () {
                                }

                            })
                        }

                    }
                    else {

                        if (Name == '') {
                            document.getElementById('error0').innerHTML = "<span style='color:red'>Name Required";
                        }
                        if (Address == "") {
                            document.getElementById('error1').innerHTML = "<span style='color:red'>Address Required";
                        }

                        alert("Please Fill Store Details");
                        return false;

                    }

                });



            }
        });

    }

    CreateData() {
        $('#m_Title').text("Create Record");
        $('#Modal').modal('show');

    }
    CloseData() {
        $('#Modal').modal('hide');
        $("#Name").val('');
        $("#Address").val('');

    }
    CloseDelete() {
        $('#Delete_Modal').modal('hide');
    }


    render() {

        return (
            <React.Fragment>
                <div>
                    <br />
                    <h2> Store Details</h2>
                    <br />
                    <a href="#" class="ui primary button" id="btnCreate" onClick={this.CreateData}><i class="plus icon"></i>Add New Store</a>
                    <br />
                    <br />
                    <table id="StoreTable" class="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Action(Edit)</th>
                                <th>Action(Delete)</th>
                            </tr>
                        </thead>
                        <tbody id="SetStoresList" data-bind="foreach: stores">

                        </tbody>
                    </table>

                    <div id="Delete_Modal" class=" ui small modal">
                        <i class=" close icon"></i>
                        <div class="header">
                            <h2 id="modal_Title"></h2>
                        </div>

                        <div class="content">
                            <div class="ui form">
                                <div class="field">
                                    <label>Do you want to delete the Store? </label>
                                </div>
                                <br />

                                <div class="modal-footer">
                                    <input type="submit" value="Yes" class="ui blue button" id="btnDeleteSubmit" />
                                    <input type="reset" value="Cancel" class="ui red button" id="btnCloseDelete" onClick={this.CloseDelete} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="Modal" class=" ui small modal">
                        <i class=" close icon"></i>
                        <div class="header">
                            <h2 id="m_Title"></h2>
                        </div>

                        <div class="content">
                            <div class="ui form">
                                <div class="field">
                                    <label>Name</label>
                                    <br />
                                    <div id="error0"></div>
                                    <input type="text" id="Name" data_bind="textInput: Name, valueUpdate: 'afterkeydown'" />
                                </div>
                                <br />
                                <div class="field">
                                    <label>Address</label>
                                    <br />
                                    <div id="error1"></div>
                                    <input type="text" id="Address" data_bind="textInput: Address, valueUpdate: 'afterkeydown'" />
                                </div>
                                <br />
                                <br />

                                <div class="modal-footer">
                                    <input type="submit" value="Save" class="ui blue button" id="btnSubmit" />
                                    <input type="reset" value="Close" class="ui red button" id="btnClose" onClick={this.CloseData} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>

        )
    }
}

ReactDOM.render(
    <Store />,
    document.getElementById('root')
);
