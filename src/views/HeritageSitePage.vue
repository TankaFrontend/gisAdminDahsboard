<template>
    <div class="inventory-container">
        <div class="inventory-header">
            <a data-bs-toggle="modal" data-bs-target="#addSiteModal" class="add-product">Add Site</a>
        </div>
        <div class="product-list">
            <div class="product-card" v-for="site in sites" :key="site._id">
                <img :src="site.image" alt="Site Image">
                <div class="product-title">{{ site.name }}</div>
                <div class="product-units">Longitude: {{ site.longitude }}, Latitude: {{ site.latitude }}</div>
                <button class="product_button" @click="openUpdateModal(site)">Update</button>
                <button class="delete-product" @click="deleteSite(site._id)">Delete Site</button>
            </div>
        </div>
    </div>

    <!-- Add Site Modal -->
    <div class="modal fade" id="addSiteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addSiteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addSiteModalLabel">Add New Site</h1>
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
                        <button type="submit" class="btn btn-primary">
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

    <!-- Update Site Modal -->
    <div class="modal fade" id="updateSiteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateSiteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="updateSiteModalLabel">Update Site</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitUpdateForm">
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
                            <input type="file" class="form-control" name="image" id="image" @change="handleImageUpload" accept="image/*" />
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
                        <button type="submit" class="btn btn-primary">
                            <span v-if="loading">           
                                <div class="loader"></div>
                            </span>
                            <span v-else>Update</span>
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
    name: 'loginPage',
    data() {
        return {
            sites: [],
            name: "",
            detail: "",
            image: null,
            latitude: "",
            longitude: "",
            loading: false,
            isEditing: false,  // To track whether we are editing a site
            currentSiteId: null, // To store the site id for updates
        };
    },

    mounted() {
        let userLogin = localStorage.getItem('adminAuth');
        if (!userLogin) {
            this.$router.push({ name: 'adminLoginPage' });
        }
        this.fetchUsers();
    },

    methods: {
        // Open the Update modal with existing data
        openUpdateModal(site) {
            this.isEditing = true;
            this.currentSiteId = site._id;
            this.name = site.name;
            this.detail = site.detail;
            this.latitude = site.latitude;
            this.longitude = site.longitude;

            // Open the Update Site modal
            const modalElement = document.getElementById("updateSiteModal");
            const modalInstance = new Modal(modalElement);
            modalInstance.show();
        },

        handleImageUpload(e) {
            this.image = e.target.files[0];
        },

        // Submit new site (Add Site)
        submitForm() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('detail', this.detail);
            formData.append('latitude', this.latitude);
            formData.append('longitude', this.longitude);
            formData.append('image', this.image);

            this.loading = true;
            const token = localStorage.getItem('adminAuth');
            fetch("https://projectbackend-7waf.onrender.com/api/heritageSite/createHeritageSite", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                this.loading = false;
                const modalElement = document.getElementById("addSiteModal");
                const modalInstance = Modal.getInstance(modalElement);
                modalInstance.hide();
                if (res.message === 'HeritageSite Created') {
                    this.fetchUsers();
                    window.location.reload
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.loading = false;
            });
        },

        // Submit updated site (Update Site)
        submitUpdateForm() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('detail', this.detail);
            formData.append('latitude', this.latitude);
            formData.append('longitude', this.longitude);
            if (this.image) formData.append('image', this.image);

            this.loading = true;
            const token = localStorage.getItem('adminAuth');
            fetch(`https://projectbackend-7waf.onrender.com/api/heritageSite/updateHeritageSite/${this.currentSiteId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                this.loading = false;
                const modalElement = document.getElementById("updateSiteModal");
                const modalInstance = Modal.getInstance(modalElement);
                modalInstance.hide();
                if (res.message === 'HeritageSite Updated') {
                    this.fetchUsers();
                    window.location.reload
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.loading = false;
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
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        async deleteSite(siteId) {
            const token = localStorage.getItem('adminAuth');
            try {
                const response = await fetch(`https://projectbackend-7waf.onrender.com/api/heritageSite/deleteHeritageSite/${siteId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.message === 'HeritageSite removed') {
                    this.sites = this.sites.filter(site => site._id !== siteId);
                    alert('Site deleted successfully');
                } else {
                    alert('Failed to delete site');
                }
            } catch (error) {
                console.error('Error deleting site:', error);
                alert('Error occurred while deleting the site');
            }
        },
    },
};
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