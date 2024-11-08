<template>
    <div>
        <div class="dashboard-container">
        <!-- Sidebar Section -->
        <div class="sidebar">
            <div class="logo">
                <h1 style="color: #5cb85c;">NITP</h1>
            </div>

            <h3>MENU</h3>
            <ul class="menu">

                <router-link to="/" class="active router" >Dashboard</router-link>
                <router-link to="/heritageSite" class="router" >Heritage Sites</router-link>

            </ul>
            <div class="logout">Log out</div>
        </div>

        <!-- Main Content Section -->
        
        <div class="main-content">
            <div class="header">
                <h1>Dashboard</h1>
                <div class="search-bar">
                    <input type="text" placeholder="Search...">
                    <!-- Search icon -->
                    </div>
                <div class="user-info">
                <div class="user-name"><small>Administrator</small></div>
                </div>
            </div>

            <!-- Welcome and Transactions Table -->

            <div v-if="isHeritageRoute">
                    <router-view></router-view>
                </div>
             
            <div class="body" v-if="!isHeritageRoute">
                <h2>Welcome, Admin</h2>
                <p>Monday, 05 August 2025</p>
                <h2>Users</h2>
                
                <div>
                    <div v-if="users.length">
                        <table class="transaction-table">
                            <thead>
                                <tr>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th>Date & Time</th>
                                    <!-- <th>Subscribed</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user._id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.createdAt }}</td>
                                    <!-- <td><span class="status completed">Completed</span></td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p v-else>No users found.</p>
                </div>

                <!-- <div v-if="isHeritageRoute">
                    <router-view></router-view>
                </div> -->


            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';




export default {
    name:'loginPage',
    data:() =>{
        return {
            users: [],
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
        async fetchUsers() {
            try {
            const token = localStorage.getItem('adminAuth');
            const res = await axios.get('https://projectbackend-7waf.onrender.com/api/users/allUsers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.users = res.data.data;
            console.log(res.data.data);
            

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

        @font-face {
            font-family: 'NextShpere';
            src:
                url('../assets/fonts/SphereNextThin.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        @font-face {
            font-family: 'NextSh';
            src: 
            url('../assets/fonts/NextSphereBlack.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Plus Jakarta Sans", sans-serif;
        }

        /* Container for dashboard layout */
        .dashboard-container {
            font-family: "Plus Jakarta Sans", sans-serif;
            display: flex;
            min-height: 100vh;
            background-color: #f9f9f9;
        }

        /* Sidebar styling */
        .sidebar {
            width: 250px;
            background-color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid #ddd;
        }

        .sidebar .logo {
            text-align: center;
            margin-bottom: 30px;
        }

        .sidebar .logo img {
            width: 150px;
            display: block;
            margin: 0 auto;
        }

        .sidebar .menu {
            list-style: none;
        }

        .sidebar .menu li {
            margin: 15px 0;
        }

        .router{
            text-decoration: none;
            color: #333;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
        }
        
        h3{
            font-family: "Plus Jakarta Sans", sans-serif;
            font-weight:600;
            color:#94A3B8;
            font-size:16px;
        }
        .sidebar .menu li a:hover, .sidebar .menu li a.active {
            background-color: #d2e9d2;
            color: #5cb85c;
            font-weight:700;
            border-radius:12px;
            font-family: "Plus Jakarta Sans", sans-serif;
        }
        
        .sidebar .menu li a img {
            margin-right: 10px;
            color: #DA200C;
        }

        .sidebar .logout {
            margin-top: auto;
            text-align: center;
            font-size: 14px;
            color: #666;
            cursor: pointer;
        }

        /* Main content area */
        .main-content {
            flex: 1;
            /* padding: 20px;s */
        }

        .main-content .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            background:#fff;
            padding:20px;
        }
        .body{
            padding:20px;
        }

        .main-content .header h1 {
            font-size: 24px;
            color: #333;
        }

        .main-content .header .search-bar {
            position: relative;
            width: 250px;
        }

        .main-content .header .search-bar input {
            width: 100%;
            padding: 8px 40px 8px 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }

        .main-content .header .search-bar svg {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
        }

        .main-content .header .user-info {
            display: flex;
            align-items: center;
        }

        .main-content .header .user-info img {
            width: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .main-content .header .user-info .user-name {
            font-size: 14px;
            color: #333;
        }

        /* Transaction table */
        .transaction-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .transaction-table th, .transaction-table td {
            padding: 15px;
            text-align: left;
            font-size: 14px;
        }

        .transaction-table th {
            background-color: #f3f3f3;
            color: #666;
            font-weight: bold;
        }

        .transaction-table td {
            border-bottom: 1px solid #eee;
        }

        .transaction-table .status {
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 12px;
            color: #fff;
        }

        .transaction-table .status.completed {
            background-color: #5cb85c;
        }

        .transaction-table .status.cancelled {
            background-color: #d9534f;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .dashboard-container {
                flex-direction: column;
            }

            .sidebar {
                width: 100%;
                padding: 10px;
                flex-direction: row;
                justify-content: space-between;
            }

            .main-content .header {
                flex-direction: column;
                align-items: flex-start;
            }

            .main-content .header .search-bar, .main-content .header .user-info {
                margin-top: 10px;
            }
        }

</style>