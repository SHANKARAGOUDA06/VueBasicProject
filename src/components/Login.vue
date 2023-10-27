<template>
    <div class="login">
        <h1>LogIn</h1>
        <input type="email" v-model="email" placeholder="Enter Email" />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        <input type="password" v-model="password" placeholder="Enter Password" />
        <div class="error-message">
            <span v-if="errors.pass" >{{ errors.pass }}</span>
            <span v-if="showWarning" >Invalid user</span>
        </div>
        <button type="submit" v-on:click="login">LogIn</button>
    </div>
    <router-link to="/" id="signup">SignUp</router-link>
</template>

<script>
import "../css/login.css";
import axios from "axios";
export default {
    name: 'logIn',
    data() {
        return {
            email: '',
            password: '',
            errors: {},
            showWarning: false,
        }
    },
    methods: {
        async login() {
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

            let result = await axios.get(`http://localhost:3000/user?email=${this.email}`)
            // console.log(result)
            if (result.status == 200 && result.data.length > 0) {
                if (!this.password) {
                    this.errors.pass = "Enter a Password";
                    this.showWarning = false;
                }
                else {
                    if (result.data[0].password == this.password) {
                        localStorage.setItem('user-info', JSON.stringify(result.data[0]))
                        this.$router.push({ path: 'home' });
                    }
                    else {
                        this.errors.pass = "Wrong Password";
                        this.showWarning = false;
                    }
                }

            }
            else {
                this.showWarning = true;
            }
        },
        mounted() {
            let user = localStorage.getItem('user-info');
            if (user) {
                this.$router.push({ path: 'home' });
            }
        }
    },
}
</script>
<style scoped></style>