<template>
    <div class="register">
        <img src="../assets/images.png" class="logo" />
        <h1>Sign Up</h1>
        <div>
            <input type="text" placeholder="Enter Name" v-model="name" />
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div>
            <input type="email" placeholder="Enter Email" v-model="email" />
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div>
            <input type="password" placeholder="Enter password" v-model="password" />
            <span class="error-message" v-if="errors.pass">{{ errors.pass }}</span>
        </div>
        <button type="submit" v-on:click="SignUp()">Sign Up</button>
    </div>
    <router-link to="/login" id="loginlink">Login</router-link>
</template>

<script>
import "../css/login.css"
import axios from 'axios'
export default {
    name: 'signUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            showWarning: false,
            errors: {}
        }
    },
    methods: {
        async SignUp() {
            const vaildateName = (name) => {
                if (!name.length) {
                    console.log("first") 
                    return { vaild: false, error: "Name Is Required"}
                }
                return { vaild: true, error: null }
            }
            const vaildName = vaildateName(this.name);
            if (!vaildName.vaild) {
                this.errors.name = vaildName.error;
                return;
            }
            this.errors.name = null;
            const validateEmail = (email) => {
                if (!email.length) {
                    return { vaild: false, error: "Email is required" }
                }
                if (!email.match(/^\w+([.-]?\w+)*@\w+([_.-]?\w+)*\.\w{2,3}$/)) {
                    return { vaild: false, error: "Enter Valid Email" }
                }
                return { valid: true, error: null }
            }
            const validEmail = validateEmail(this.email);
            if (!validEmail.valid) {
                this.errors.email = validEmail.error;
                return;
            }
            this.errors.email = null;
            const validatePass = (pass) => {
                if (!pass) {
                    return { valid: false, error: "Password is required" }
                }
                if (pass.length < 5) {
                    return { valid: false, error: "Is To Short Use Five Charcter" }
                }
                return { valid: true, error: null }
            }
            const vaildPass = validatePass(this.password);
            if (!vaildPass.valid) {
                this.errors.pass = vaildPass.error;
                return;
            }
            this.errors.pass = null;
            let result = await axios.post('http://localhost:3000/user', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            if (result.status == 201) {
                localStorage.setItem("user-info", JSON.stringify(result.data));
                console.log(result.data)
                this.$router.push({ path: 'login' });
            }
        },
        mounted() {
            let user = localStorage.getItem('user-info');
            if (user) {
                this.$router.push({ path: 'login' });
            }
        }
    }
}
</script>

<style scoped>

</style>