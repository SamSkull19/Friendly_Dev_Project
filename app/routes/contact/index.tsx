import type { Route } from './+types/index';
import { Form } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const errors: Record<string, string> = {}

    // Error Set
    if (!name) errors.name = 'Name is Required.';

    if (!email) {
        errors.email = 'Email is Required.';
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid Email format.';
    }

    if (!subject) errors.subject = 'Subject is Required.';
    if (!message) errors.message = 'Message is Required.';

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const data = {
        name, email, subject, message,
    };

    return { message: 'Form submitted successfully!', data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
    const errors = actionData?.errors || {};

    return (
        <section className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
            <h2 className='text-3xl font-bold text-white mb-8 text-center'>
                📬 Contact Me
            </h2>

            {
                actionData?.message ? (
                    <p className='mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-sm'>
                        {actionData.message}
                    </p>
                ) : null
            }

            <Form method='post' className='space-y-6'>
                {/* Full Name */}
                <div>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-300'
                    >
                        Full Name
                    </label>

                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
                    />
                </div>
                {
                    errors.name && (<p className='text-red-400 text-sm mt-1'>{errors.name}</p>)
                }

                {/* Email */}
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-300'
                    >
                        Email Address
                    </label>

                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
                    />
                </div>
                {
                    errors.email && (<p className='text-red-400 text-sm mt-1'>{errors.email}</p>)
                }

                {/* Subject */}
                <div>
                    <label
                        htmlFor='subject'
                        className='block text-sm font-medium text-gray-300'
                    >
                        Subject
                    </label>

                    <input
                        type='text'
                        id='subject'
                        name='subject'
                        className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
                    />
                </div>
                {
                    errors.subject && (<p className='text-red-400 text-sm mt-1'>{errors.subject}</p>)
                }

                {/* Message */}
                <div>
                    <label
                        htmlFor='message'
                        className='block text-sm font-medium text-gray-300'
                    >
                        Message
                    </label>

                    <textarea
                        id='message'
                        name='message'
                        rows={5}
                        className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
                    />
                </div>
                {
                    errors.message && (<p className='text-red-400 text-sm mt-1'>{errors.message}</p>)
                }

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
                >
                    Send Message
                </button>
            </Form>
        </section>
    );
};

export default ContactPage;