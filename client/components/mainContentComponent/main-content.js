Vue.component('main-content', {
    props : ['islogin','isadmin'],
    template: `
    <div>
    <center><button v-if="isadmin === true" type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target="#addNew"> Add New Item </button></center>
    <br>
    <br>
    <div class="row">
        <div class="col-md-4" v-for="(item, index) in items">
            <figure class="card card-product">
                <div class="img-wrap"><img v-bind:src="item.img"></div>
                <!-- {{item.img}} -->
                <figcaption class="info-wrap">
                    <h4 class="title">{{ item.name }}</h4>
                    <p class="desc" v-if="isadmin === false">{{ item.description }}</p>
                    <p class="desc"><b>Category :</b> {{ item.category.name }}</p>
                    <div v-if="isadmin === true">
                        <div class="rating-wrap">
                            <center>
                            <b>Administrator Menu</b>
                            <br>
                            <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#edits" @click="editing(item._id)"> Edit </button>
                            <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal" @click="editing(item._id)"> Delete </button>
                            </center>
                        </div>
                    </div>
                </figcaption>
                <div class="bottom-wrap">
                    <a class="btn btn-sm btn-primary float-right" v-if="islogin === true && isadmin === false" v-on:click="addItemToCart(index)">Add to Cart</a>
                    <div class="price-wrap h5">
                        <span class="price-new">$ {{ item.price }}</span>
                        <!-- <del class="price-old">$1980</del> -->
                    </div> <!-- price-wrap.// -->
                </div> <!-- bottom-wrap.// -->
            </figure>
        </div> <!-- col // -->
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="edits">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Item</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <center><p><b> ITEM ID : </b> {{sId}} </p></center>
                        <div class="form-group">
                            <label for="inputdefault">Name</label>
                            <input class="form-control" type="text" v-model='sName'>
                        </div>
                        <div class="form-group">
                            <label for="inputlg">Description</label>
                            <input class="form-control input-lg" type="text" v-model='sDescription'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Price</label>
                            <input class="form-control" type="number" v-model='sPrice'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Image</label>
                            <input class="form-control-file" type="file" v-on:change="replaceImage($event)">
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Stock</label>
                            <input class="form-control" type="number" v-model='sStock'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Category</label>
                            <input class="form-control" type="text" v-model='sCategory'>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click='updateItem'>Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="deleteModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Deletion</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <center><b><h3>Are you sure you want to delete this item ?</h3></b></center>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click='deleteItem'>Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="addNew">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Item</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="inputdefault">Name</label>
                            <input class="form-control" type="text" v-model='newName'>
                        </div>
                        <div class="form-group">
                            <label for="inputlg">Description</label>
                            <textarea class="form-control" rows="4" v-model='newDescription'></textarea>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Price</label>
                            <input class="form-control" type="number" v-model='newPrice'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Image</label>
                            <input class="form-control-file" type="file" v-on:change="getImageAdd($event)">
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Stock</label>
                            <input class="form-control" type="number" v-model='newStock'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Category</label>
                            <input class="form-control" type="text" v-model='newCategory'>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click='addItem'>Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    </div>
    `,
    data: function () {
        return {
            event : '',

            items: [],
            carts : [],
            cartsBadge : 0,

            selected : '',
            sId : '',
            sName : '',
            sDescription : '',
            sPrice : '',
            sImage : '',
            sStock : '',
            sCategory : '',

            addPicture : '',

            changeImage : '',

            newName : '',
            newDescription : '',
            newPrice : '',
            newImage : '',
            newStock : '',
            newCategory : ''
        }
    },
    created: function () {
        this.getAllItems()
    },
    watch : {
        islogin : function(val){
            this.getAllItems()
        },
        event : function(val){
            this.getAllItems()
        }
    }
    ,
    methods: {
        getAllItems: function () {

            axios({
                    method: 'GET',
                    url: 'http://localhost:3000/items/'
                })
                .then(result => {
                    this.items = result.data.items
                })
                .catch(err => {
                    console.log(err)
            })

        },
        addItemToCart: function (index) {

            this.cartsBadge = this.cartsBadge + 1
            let isNew = true
            let item = {
                itemId    : this.items[index]._id,
                name      : this.items[index].name,
                price     : this.items[index].price,
                qty : 1,
                totalPrice : Number(this.items[index].price)
            }

            for(let i = 0; i < this.carts.length; i++){
                if(this.carts[i].itemId == item.itemId){
                    this.carts[i].qty += 1
                    this.carts[i].totalPrice += item.totalPrice
                    isNew = false  
                }
            }

            if(isNew){
                this.carts.push(item)
                this.subTotalPrice += item.totalPrice
            }
            this.$emit('carts-data',this.carts)
            this.$emit('carts-badge',this.cartsBadge)

        },editing : function(id) {

            axios({
                method: 'GET',
                url: `http://localhost:3000/items/edit/${id}`
            })
            .then(result => {
                this.selected = result.data
                this.sId = result.data._id
                this.sName = result.data.name
                this.sDescription = result.data.description
                this.sPrice = result.data. price
                this.sImage = result.data.img
                this.sStock = result.data.stock
                this.sCategory = result.data.category
                this.changeImage = result.data.img
            })
            .catch(err => {
                console.log(err)
            })

        },
        updateItem : function() {
            
            if(this.sImage !== this.changeImage){

                let formdata = new FormData()
                formdata.append('image', this.changeImage);

                axios.post(`http://localhost:3000/upload`, formdata, {
                
                })
                .then((response)=>{

                    let name = this.sName
                    let description = this.sDescription
                    let price = this.sPrice
                    let img = response.data.link
                    let stock = this.sStock
                    let categoryId = this.sCategory

                    let data = {
                        name,
                        description,
                        price,
                        img,
                        stock,
                        categoryId
                    }

                    let self = this

                    axios({
                        method: 'PUT',
                        url: `http://localhost:3000/items/update/${self.sId}`,
                        data
                    })
                    .then(response => {
                        self.event = response.data
                    })
                    .catch(err => {
                        console.log(err)
                    })

                })
                  
            }else{
                let name = this.sName
                let description = this.sDescription
                let price = this.sPrice
                let img = this.sImage
                let stock = this.sStock
                let categoryId = this.sCategory

                let data = {
                    name,
                    description,
                    price,
                    img,
                    stock,
                    categoryId
                }

                let self = this

                axios({
                    method: 'PUT',
                    url: `http://localhost:3000/items/update/${self.sId}`,
                    data
                })
                .then(response => {
                    self.event = response.data
                })
                .catch(err => {
                    console.log(err)
                })
            }
            
        },
        deleteItem : function(){
            let self = this

            axios({
                method: 'DELETE',
                url: `http://localhost:3000/items/delete/${self.sId}`
            })
            .then(response => {
                self.event = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        getImageAdd(link) {
            this.addPicture = link.target.files[0];
        },
        replaceImage(link) {
            this.changeImage = link.target.files[0]
        }
        ,
        addItem : function(){

            let formdata = new FormData()
            formdata.append('image', this.addPicture);

            axios.post(`http://localhost:3000/upload`, formdata, {
                
            })
            .then((response)=>{

                let name = this.newName
                let description = this.newDescription
                let price = this.newPrice
                let img = response.data.link
                let stock = this.newStock
                let categoryId = this.newCategory

                let data = {
                    name,
                    description,
                    price,
                    img,
                    stock,
                    categoryId
                }

                let self = this

                axios({
                    method: 'POST',
                    url: `http://localhost:3000/items/create`,
                    data
                })
                .then(response => {
                    self.newName = ''
                    self.newDescription = ''
                    self.newPrice = ''
                    self.addImage = ''
                    self.newStock = ''
                    self.newCategory = ''

                    self.event = response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    }
})