import React, { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' };

const validate = ({ name, email, message }) => {
    const errors = {};

    if (!name.trim()) errors.name = 'Please enter your full name.';
    if (!email.trim()) {
        errors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) errors.message = 'Please enter a message.';

    return errors;
};

const inputClasses = (hasError) =>
    `w-full px-4 py-2 mt-2 text-white rounded-full bg-transparent border focus:outline-none focus:ring-2 duration-200 ${hasError
        ? 'border-[#FC466B] focus:ring-[#FC466B]'
        : 'border-white/20 focus:ring-[#3F5EFB] hover:border-white/40'
    }`;

const FieldError = ({ id, message }) =>
    message ? (
        <p id={id} className='mt-2 px-4 text-sm text-[#FC466B]'>{message}</p>
    ) : null;

const ContactUs = () => {
    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const nextValues = { ...values, [name]: value };

        setValues(nextValues);
        setIsSubmitted(false);
        if (touched[name]) setErrors(validate(nextValues));
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(values));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate(values);
        setErrors(nextErrors);
        setTouched({ name: true, email: true, message: true });

        if (Object.keys(nextErrors).length > 0) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setValues(INITIAL_VALUES);
        setTouched({});
    };

    const isInvalid = Object.keys(validate(values)).length > 0;

    return (
        <div id='contact' className='container mx-auto'>
            <div className='lg:flex lg:px-32 gap-x-10 '>
                <div className=' flex-grow'>
                    <section className="w-full bg-gradient-to-l  from-[#110D2E]/30  to-[#fc466a4a]/10  rounded-md shadow-md  p-8 lg:p-16">
                        <div className='flex flex-col mb-10 justify-center items-center'>
                            <h2 className="text-2xl font-semibold  capitalize text-white">Drop Us Your Message</h2>
                            <p className='text-gray-400 text-center'>Freely contact with us anytime. We're available here for you.</p>
                        </div>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
                                <div className='col-span-2 lg:col-span-1'>
                                    <label htmlFor="contact-name" className="sr-only">Full Name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                        className={inputClasses(Boolean(errors.name))}
                                        placeholder='Full Name'
                                    />
                                    <FieldError id="contact-name-error" message={errors.name} />
                                </div>

                                <div className='col-span-2 lg:col-span-1'>
                                    <label htmlFor="contact-email" className="sr-only">Your Email</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                        className={inputClasses(Boolean(errors.email))}
                                        placeholder='Your Email'
                                    />
                                    <FieldError id="contact-email-error" message={errors.email} />
                                </div>

                                <div className='col-span-2'>
                                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                                    <input
                                        id="contact-subject"
                                        name="subject"
                                        type="text"
                                        value={values.subject}
                                        onChange={handleChange}
                                        className={inputClasses(false)}
                                        placeholder='Select Subject'
                                    />
                                </div>

                                <div className='col-span-2 '>
                                    <label htmlFor="contact-message" className="sr-only">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={Boolean(errors.message)}
                                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                        className={`${inputClasses(Boolean(errors.message))} rounded-3xl px-6`}
                                        placeholder='Message...'
                                        rows={5}
                                    />
                                    <FieldError id="contact-message-error" message={errors.message} />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 justify-start mt-6">
                                <button
                                    type="submit"
                                    disabled={isInvalid || isSubmitting}
                                    className="min-h-[44px] px-6 py-2 rounded-full bg-[#6318F1] text-white duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Messages'}
                                </button>

                                {isSubmitted && (
                                    <p role="status" className='text-sm text-[#5eead4]'>
                                        Thanks! Your message has been sent.
                                    </p>
                                )}
                            </div>
                        </form>
                    </section>
                </div>


                <div className='  lg:w-[22%] flex flex-col items-center justify-center mx-16 formBorder-gradient border'>

                    <div className='flex flex-1 flex-col items-center justify-around '>      
                      <div className='flex flex-col justify-center items-center py-4'>
                      <FaPhoneAlt size={44} className='text-blue-700 my-4'/>
                        <div className='text-white text-lg py-1'>Phone</div>
                        <div className='text-gray-400 text-lg'>0310 - 7756294</div>
                      </div>
                        <hr className='w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
                    </div>

                   
                    <div className='flex flex-1 flex-col items-center justify-around '>      
                      <div className='flex flex-col justify-center items-center py-4'>
                      <MdMarkEmailUnread size={44} className='text-blue-700 my-4'/>
                        <div className='text-white text-lg py-1'>Email</div>
                        <div className='text-gray-400 text-lg'>0310 - 7756294</div>
                      </div>
                        <hr className='w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
                    </div>

                    
                    <div className='flex flex-1 flex-col items-center justify-around '>      
                      <div className='flex flex-col justify-center items-center py-4'>
                      <FaLocationDot size={44} className='text-blue-700 my-4'/>
                        <div className='text-white text-lg py-1'>Location</div>
                        <div className='text-gray-400 text-lg'>0310 - 7756294</div>
                      </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ContactUs
