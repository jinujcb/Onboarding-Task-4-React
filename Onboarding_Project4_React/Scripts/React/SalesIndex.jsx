import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Sales extends React.Component {
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
                    type: "GET",
                    url: "/Sales/GetAllSales",

                    success: function (data) {
                        var jsondata = JSON.parse(data);//to change serialised data format
                        for (var item in jsondata) {
                            jsondata[item].Datesold = moment(jsondata[item].Datesold).format('L');//change date format
                        }
                        console.log(jsondata);
                        $.each(jsondata, function (index, obj) {
                            var ID = obj.ID;
                            console.log(obj.ID);
                            console.log(obj.Customer.Name);
                            var row = '<tr><td> ' + obj.Customer.Name + ' </td><td>' + obj.Product.Name + ' </td><td>' + obj.Store.Name + ' </td><td>' + obj.Datesold + ' </td><td> <div><span id="btn_edit" ><a href="#" class="ui yellow button " id="' + obj.ID + '" style="color:white; margin-left:10px"" ><i class="edit icon"></i>Edit</a></span></div></td>' + '<td><div><span id="btn_delete" ><button class="ui red button" id="' + obj.ID + '"style="color:white; margin-left:10px""><i class="trash icon"></i> Delete</button></span></div></td></tr>';
                            $("#SaleTable tbody").append(row);

                        });
                    }
        });

        $.ajax({
            type: "GET",
            url: "/Customers/GetAllCustomers",
            success: function (data) {

                var select = document.getElementById("Customer_Name");
                for (var item in data) {
                    var option = document.createElement('option');
                    option.text = data[item].Name;
                    option.value = data[item].ID;
                    select.add(option, 0);
                }
            }
        })

        $.ajax({
            type: "GET",
            url: "/Products/GetAllProducts",
            success: function (data) {
                var select = document.getElementById("Product_Name");
                for (var item in data) {
                    var option = document.createElement('option');
                    option.text = data[item].Name;
                    option.value = data[item].ID;
                    select.add(option, 0);
                }
            }
        });
        $.ajax({
            type: "GET",
            url: "/Stores/GetAllStores",
            success: function (data) {
                var select = document.getElementById("Store_Name");
                for (var item in data) {
                    var option = document.createElement('option');
                    option.text = data[item].Name;
                    option.value = data[item].ID;
                    select.add(option, 0);
                }
            }
        })



        $(document).on('click', '#btn_edit', function(event) {

            Id = event.target.id;

            $.ajax({
                url: '/Sales/GetSale',
                method: 'GET',
                data: { ID: Id },
                success: function(data) {
                    ID = data.ID
                    return true;
                },

            })

            $('#m_Title').text("Edit Record");
            $('#Modal').modal('show');

        });


        $(document).on('click', '#btn_delete', function(event) {
            Id = event.target.id;
            del_Id = Id; 
         
            $.ajax({
                url: '/Sales/GetSale',
                method: 'GET',
                data: { ID: Id },
                success: function (data) {

                },
                error: function (data) {
                   
                }
            })
            $('#modal_Title').text("Delete Record");
            $('#Delete_Modal').modal('show');
           

        });

        $(document).on("click", "#btnDeleteSubmit", null, function (event) {
             Id = del_Id;
           
            $.ajax({
                url: '/Sales/Delete',
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

        $(document).on("click", "#btnSubmit", null, function(ev) {
            var Customer_Name = $("#Customer_Name").val();
            var Product_Name = $("#Product_Name").val();
            var Store_Name = $("#Store_Name").val();
            var Datesold = $("#Datesold").val();

            if (Customer_Name != '' && Product_Name != '' && Store_Name != '' && Datesold != '') {

                if ($('#m_Title').text() === "Create Record") {


                    $.ajax({
                        url: '/Sales/Create',
                        method: 'POST',
                        data: {
                            CustomerID: Customer_Name, ProductID: Product_Name, StoreID: Store_Name, Datesold: Datesold
                        },
                        success: function() {
                            location.reload();
                            return true;
                        },
                        error: function() {
                            location.reload();
                        }
                    })
                }
                else if ($('#m_Title').text() === "Edit Record") {


                    $.ajax({
                        url: '/Sales/Edit',
                        method: 'POST',
                        data: {
                            ID: Id, CustomerID: Customer_Name, ProductID: Product_Name, StoreID: Store_Name, Datesold: Datesold
                        },
                        success: function() {
                            location.reload();

                        },
                        error: function() {
                        }

                    })
                }

            }
            else {
           
                if (Customer_Name == '') {
                    document.getElementById('error0').innerHTML = "<span style='color:red'> Customer Name Required";
                }
                if (Product_Name == "") {
                    document.getElementById('error1').innerHTML = "<span style='color:red'> Product Name Required";
                }
                if (Store_Name == "") {
                    document.getElementById('error2').innerHTML = "<span style='color:red'> Store Name Required";
                }
                if (Datesold == "") {
                    document.getElementById('error3').innerHTML = "<span style='color:red'> Please select Date";
                }
                alert("Please Fill Sale Details");
                return false;
            }

        });



    

    }

    CreateData() {
        $('#m_Title').text("Create Record");
        $('#Modal').modal('show');

    }
    CloseData() {
        $('#Modal').modal('hide');   

    }
    CloseDelete() {
        $('#Delete_Modal').modal('hide');
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <br />
                    <h2> Sales Details</h2>
                    <br />

                    <a href="#" class="ui primary button" id="btnCreate" onClick={this.CreateData}><i class="plus icon"></i>Add New Sale</a>

                <br />
                <br />

                    <table id="SaleTable" class="ui striped celled selectable center aligned table" >

                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Store Name</th>
                            <th>Date Sold</th>
                            <th>Action(Edit)</th>
                            <th>Action(Delete)</th>
                        </tr>
                    </thead>

                    <tbody id="SetStudentList"></tbody>

                    </table>

                    <div id="Delete_Modal" class=" ui small modal">
                        <i class=" close icon"></i>
                        <div class="header">
                            <h2 id="modal_Title"></h2>
                        </div>

                        <div class="content">
                            <div class="ui form">
                                <div class="field">
                                    <label>Do you want to delete the Sale? </label>
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
                                    <label>Customer Name</label>
                                    <br />
                                    <div id="error0"></div>
                                    <select id="Customer_Name"></select>
                                    <span class="validity">  </span>
                                </div>

                                
                                <br />

                                <div class="field">
                                    <label>Product Name</label>
                                    <br />
                                    <div id="error1"></div>
                                    <select id="Product_Name"></select>
                                    <span class="validity">  </span>
                                </div>
  
                                <br />

                                <div class="field">
                                    <label>Store Name</label>
                                    <br />
                                    <div id="error2"></div>
                                    <select id="Store_Name">
                                       
                                    </select>
                                    <span class="validity">  </span>
                                </div>

                                <br />


                                <div class="field">
                                    <label>Date Sold</label>
                                    <br />
                                    <div id="error3"></div>
                                    <input id="Datesold" type="date" class="datepicker" name="date" />
                                    <span class="validity">  </span>
                                </div>
                             
                                   

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
    <Sales />,
    document.getElementById('root')
);
