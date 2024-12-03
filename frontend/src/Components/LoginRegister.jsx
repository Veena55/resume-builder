
import gsap from 'gsap';
import { useEffect, useRef } from "react";
import RegisterForm from './Login/Register/RegisterForm';
import LoginForm from './Login/LoginForm/Login';
import Auth from '../assets/images/auth1.svg';
import Auth2 from '../assets/images/auth2.svg';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const navigate = useNavigate();
    const curve1 = useRef(null);
    const curve1_content = useRef(null);
    const curve2_content = useRef(null);
    const registerForm = useRef(null);
    const loignForm = useRef(null);
    // gsap.registerPlugin(useGSAP);
    const animateLeftCurve = () => {
        const mq = window.matchMedia("(max-width: 900px)");
        const mq2 = window.matchMedia("(max-width: 660px)");
        const tl = gsap.timeline();

        tl.set(curve2_content.current, { y: 0 });
        tl.to('.img1', {
            display: 'none'
        });
        tl.to(curve1_content.current, {
            y: 0,
            display: "none"
        })
        if (mq.matches || mq2.matches) {
            tl.to(curve1.current, {
                borderRadius: "0",
                x: "0%",
                y: "0%",

            })
                .to(curve1.current, {
                    borderRadius: "50%",
                    x: "-30%",
                    y: "-90%",
                }).to(registerForm.current, {
                    display: 'block',
                    x: 0,
                });
        } else {
            tl.set(registerForm.current, { x: "2%" });
            // Animate curve1
            tl.to(curve1.current, {
                borderRadius: "0",
                x: "0%",
                y: "0%",
                // duration: .5
            })
                .to(curve1.current, {
                    borderRadius: "50%",
                    x: "30%",
                    y: "-60%",
                    duration: .5
                }).to(registerForm.current, {
                    display: 'block',
                    x: 50,
                });
        }
        tl.to('.img2', {
            display: 'block',
            y: 20
        })
        // Animate loginForm and curve1_content
        tl.to(loignForm.current, {
            display: 'none',
            // duration: 0.5
        })

            // Animate curve2_content and registerForm
            .to(curve2_content.current, {
                display: 'block',
                y: 30,
                ease: 'linear',
            })

    }

    const animateRightCurve = () => {
        const mq = window.matchMedia("(max-width: 900px)");
        const mq2 = window.matchMedia("(max-width: 660px)");
        const tl = gsap.timeline();
        // Reset the elements to their initial state before animating
        tl.set(curve1_content.current, { y: 0 });

        tl.to(curve2_content.current, {
            y: 0,
            display: 'none'
        },)
        tl.to('.img2', {
            display: 'none'
        })
        if (mq.matches || mq2.matches) {
            tl.to(registerForm.current, {
                display: 'none'
            }).to(curve1.current, {
                borderRadius: "0%",
                x: "0%",
                y: "0%",
            })
                .to(curve1.current, {
                    borderRadius: "50%",
                    x: "-28%",
                    y: "22%",
                }).to(curve1_content.current, {
                    y: -20,
                    display: 'none'
                },)
        } else {
            tl.set(loignForm.current, { x: "5%" });
            tl.to(registerForm.current, {
                display: 'none'
            }).to(curve1.current, {
                borderRadius: "0%",
                x: "0%",
                y: "0%",
            })
                .to(curve1.current, {
                    borderRadius: "50%",
                    x: "-60%",
                    y: "-60%",
                });

        }
        tl.to(curve1_content.current, {
            display: 'block',
            y: 30
        })
            .to(loignForm.current, {
                display: 'block',
                x: -50
            });
        tl.to('.img1', {
            display: 'block',
            y: 20
        })
    }
    useEffect(() => {

        if (localStorage.getItem('token')) {
            console.log("hi");
            navigate('/resume');
        }

    })
    return (
        <>
            <div className="auth-curve" id="authCover" ref={curve1}>
            </div>
            <div className="img1">
                <img src={Auth2} alt="" />
            </div>
            <div className="img2">
                <img src={Auth} alt="" width="50%" style={{ transform: "rotateY(-180deg)" }} />
            </div>
            <div className="auth-content-cover p-5" ref={curve1_content}>
                <h5>Don't have an account?</h5>
                <p className="mb-0 mt-3 taglines">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                <p className="mb-0 taglines">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                <button className="btn cta-btn-3 rounded-5 px-5 mt-3" onClick={animateLeftCurve}>Register</button>
            </div>
            <div className="auth-content-cover-2 p-lg-5" ref={curve2_content}>
                <h5>Already have an account?</h5>
                <p className="mb-0 mt-3 taglines">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                <p className="mb-0 taglines">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                <button className="btn cta-btn-3 rounded-5 px-5 mt-3" onClick={animateRightCurve}>Login</button>
            </div>

            <div className="register-form-cover" ref={registerForm} >
                <RegisterForm />
            </div>
            <div className="login-form-cover" ref={loignForm} >
                <LoginForm />
            </div>
        </>

    )
}

export default LoginRegister;