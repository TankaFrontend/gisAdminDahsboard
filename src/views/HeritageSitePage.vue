<template>

    <div class="inventory-container">
        <div class="inventory-header">
            <a data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="add-product">Add Site</a>
        </div>
        <div class="product-list">
            <div class="product-card" v-for="site in sites" :key="site._id">
                <img src="../assets/img/Adaada_House_Mysterious_Stream.jpg" alt="White T-Shirt">
                <div class="product-title">{{ site.name }}</div>
                <div class="product-units">Longitude: {{ site.longitude }}, Latitude:{{site.latitude}}</div>
                <div class="product-price">$40</div>
                <button class="product_button">Update</button>
            <button class="delete-product">Delete Site</button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div class="modal-body">
    
                <form @submit.prevent="submitForm">
                        
                        <div class="mb-3">
                            <label for="siteName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="siteName" v-model="name" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="siteDetail" class="form-label">Detail</label>
                            <textarea class="form-control" id="siteDetail" v-model="detail" rows="4" required></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="siteImage" class="form-label">Upload Image</label>
                            <input type="file" class="form-control" name="image" id="image" @change="handleImageUpload" accept="image/*" required />
                        </div>
                        
                        <div class="mb-3">
                            <label for="latitude" class="form-label">Latitude</label>
                            <input type="text" class="form-control" id="latitude" v-model="latitude" required>
                        </div>
                    
                        <div class="mb-3">
                            <label for="longitude" class="form-label">Longitude</label>
                            <input type="text" class="form-control" id="longitude" v-model="longitude" required>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit"  class="btn btn-primary">
                            <span v-if="loading">           
                                <div class="loader"></div>
                            </span>
                            <span v-else>Submit</span>
                        </button>
                    </form>



            </div>
        </div>
    </div>
    </div>

</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';



export default {
    name:'loginPage',
    data:() =>{
        return {
            sites: [],
            name: "",
            detail: "",
            image: null,
            latitude: "",
            longitude: "",
            loading: false,
        };
    },


    computed:{

        isHeritageRoute() {
            return this.$route.path.includes('/heritageSite');
        },

    },



    mounted() {
        let userLogin = localStorage.getItem('adminAuth');
        if (!userLogin) {
            this.$router.push({ name: 'adminLoginPage' });
        } 
        // this.fetchUsers();
    },

    methods: {

        handleImageUpload(e) {
            this.image = e.target.files[0];
           
        },


            submitForm()
            {

                const formData = new FormData();
                formData.append('name', this.name);
                formData.append('detail', this.detail);
                formData.append('latitude', this.longitude);
                formData.append('longitude', this.latitude);
                formData.append('image', this.image);

                console.log(...formData);

                this.loading = true;
                const token = localStorage.getItem('adminAuth');
                fetch("https://projectbackend-7waf.onrender.com/api/heritageSite/createHeritageSite", {
                    
                    method: "POST",
                    headers: {
                    "Accept":"application/json",
                    "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    
                    if (res.message == 'HeritageSite Created'){
                        this.loading = false;
                        const modalElement = document.getElementById("staticBackdrop");
                        const modalInstance = Modal.getInstance(modalElement);
                        modalInstance.hide();
                    }
                    else{
                        this.error = 'data not uploaded';
                        const modalElement = document.getElementById("staticBackdrop");
                        const modalInstance = Modal.getInstance(modalElement);
                        modalInstance.hide();
                    }

                })
                .catch(error => {
                    console.error('Error:', error);

                    this.error = 'Data not Uploaded'
                });
            },


        async fetchUsers() {
            try {
            const token = localStorage.getItem('adminAuth');
            const res = await axios.get('https://projectbackend-7waf.onrender.com/api/heritageSite/getHeritageSites', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.sites = res.data;
            console.log(res.data);
            

        } catch (error) {
            console.error('Error fetching users:', error);
        }
        },
    },
    
    created() {
        this.fetchUsers();
    },

}
</script>

<style scoped>

    .loader {
        width: 35px;
        margin-left: auto;
        padding: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #ffffff;
        --_m: 
            conic-gradient(#f4080800 30%,#ff9595),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
                mask: var(--_m);
        -webkit-mask-composite: source-out;
                mask-composite: subtract;
        animation: l3 0.4s infinite linear;
    }
    @keyframes l3 {to{transform: rotate(1turn)}}

        /* Inventory */
        .inventory-container {
            padding: 20px;
        }

        .inventory-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        h3{
            font-family: "Plus Jakarta Sans", sans-serif;
            font-weight:600;
            color:#94A3B8;
            font-size:16px;
        }

        .inventory-header a {
            text-decoration:none;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .inventory-header button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .add-product {
            background-color: #5cb85c;
            color: #fff;
        }

        .delete-product {
            background-color: #DA200C;
            color: #fff;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-left: 5%;
        }

        .product-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
        }

        .product-card {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }

        .product-card img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .product-card .product-title {
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .product-card .product-units {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
        }

        .product-card .product-price {
            font-size: 20px;
            color: #DA200C;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .product_button {
            background-color: #5cb85c;
            color: #fff;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .dashboard-container {
                flex-direction: column;
            }

            .sidebar {
                width: 100%;
                flex-direction: row;
                justify-content: space-between;
            }

            .header {
                flex-direction: column;
                align-items: flex-start;
            }

            .inventory-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .product-list {
                grid-template-columns: 1fr;
            }
        }

</style>