<template>


<div class="container">
        <!-- Left Section -->
        <div class="left">
            <div class="overlay">
                <div class="logo">
                    <!-- <h1>AFRICA UNITED SPACE</h1> -->
                </div>
            </div>
        </div>

        <!-- Right Section -->
        <div class="right">
            <div class="form-container">
                <h2>Admin Login</h2>
                <p>Welcome back! please enter your detail</p>
                <form @submit.prevent="login">

                    <div class="form-group">
                       <input v-model="userName" type="text" id="email" placeholder="UserName" required>
                    </div>

                    <div class="form-group">
                       <input v-model="password" type="password" id="password" placeholder="Password" required>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 py-3 rounded-3 rounded-pill" :disabled="loading">
                        <span v-if="loading">           
                            <div class="loader"></div>
                        </span>
                        <span v-else>Proceed</span>
                    </button>

                </form>
            </div>
        </div>
    </div>



</template>


<script>

export default {
    name:'loginPage',
    data:() =>{
        return {
            userName:'',
            password:'',
            error:null,
            loading: false,
        };
    },


    methods: {
        login() {
            this.loading = true;
            fetch("https://projectbackend-7waf.onrender.com/api/admin/loginAdmin", {

                method: "POST",
                headers: {
                "Accept":"application/json",
                "Content-Type": "application/json",
                },

                body:JSON.stringify({
                    userName:this.userName,
                    password:this.password
                })
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                

                if (!res.accessToken) {
                    this.error = res.message
                    this.loading = false;
                }else{
                    localStorage.setItem('adminAuth', res.accessToken);
                    this.loading = false;
                    this.$router.push({name:'dashBoardPage'})
                    // window.location.href = '/heritageSite'; 

                }
            })

        }
        
    },
}

</script>



<style scoped>

    .loader {
        width: 35px;
        margin-left: 50%;
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
        url('../assets//fonts/NextSphereBlack.ttf') format('truetype');

        font-weight: normal;
        font-style: normal;
    }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        /* Split screen layout */
        .container {
            display: flex;
            min-height: 100vh;
        }

        /* Left side styling */
        .left {
            flex: 1;
            background: url('../assets/img/works.png') no-repeat center center;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .left .overlay {
            min-height:50vh;
            position: relative;
            text-align: center;
            color: white;
        }

        .left .logo {
            font-size: 24px;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
        }

        .left .logo img {
            width: 50px;
            margin-right: 10px;
        }

        /* Right side styling */
        .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            padding: 20px;
            min-height:50vh;
            font-family: "Plus Jakarta Sans", sans-serif;
            }

        .form-container {
            width: 100%;
            max-width: 400px;
            padding: 40px;
            font-family: "Plus Jakarta Sans", sans-serif;
        }

        .form-container h2 {
            font-family: "Plus Jakarta Sans", sans-serif;
            margin-bottom: 12px;
            color: #000000;
        }
        .form-container p {
            font-family: "Plus Jakarta Sans", sans-serif;
            margin-bottom: 32px;
            color: #64748B;
            font-size:14px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            font-family: "Plus Jakarta Sans", sans-serif;
            font-size: 14px;
            color: #666;
        }

        .form-group input {
            font-family: "Plus Jakarta Sans", sans-serif;
            width: 100%;
            padding-left: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 5px;
            font-size: 14px;
        }

        .form-group #rememberMe{
            width:10px;
        }
        .form-group input:focus {
            border-color: #333;
            outline: none;
        }

        .form-group .remember-me {
            display: flex;
            align-items: center;
        }

        .form-group .remember-me input {
            width: auto;
            margin-right: 10px;
        }

         .forgot-password {
            /* margin-top: 10px; */
            justify-content:center;
            display:flex;
            gap:5px;
            font-family: "Plus Jakarta Sans", sans-serif;
            font-size: 14px;
            text-align: right;
        }
        
        .forgot-password a {
            text-decoration: none;
            font-family: "Plus Jakarta Sans", sans-serif;
            color: #86B817;
            font-weight:500;
        }

        .forgot-password .black{
            color:black;
            font-weight:400;
        }
       

        .btn {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            background-color: #86B817;
            margin-bottom:25px;
            font-family: "Plus Jakarta Sans", sans-serif;
            color: #ffffff;
            border: none;
            font-weight:700;
            border-radius: 12px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .btn:hover {
            background-color: #86B817;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column-reverse;
            }

            .left, .right {
                flex: none;
                width: 100%;
            }

            .form-container {
                padding: 20px;
            }
        }


</style>