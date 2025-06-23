import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services`);
      const data = await response.json();
      setServices(data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your inquiry! I will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitMessage('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Jeremiah M. James</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1604011237320-8e0506614fdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmFja2dyb3VuZHxlbnwwfHx8Ymx1ZXwxNzUwNzEwNzQ1fDA&ixlib=rb-4.1.0&q=85)'
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-300 flex items-center justify-center text-6xl">
            👨‍💻
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Jeremiah M. James
          </h1>
          <p className="text-xl md:text-2xl mb-6 animate-fade-in-up animation-delay-200">
            ICT Specialist & Technology Solutions Expert
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
            Providing comprehensive IT services including web development, computer repair, 
            CCTV installation, and networking solutions for individuals and businesses.
          </p>
          <div className="space-x-4 animate-fade-in-up animation-delay-600">
            <a href="#services" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block">
              My Services
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate ICT professional with a strong educational background and diverse technical expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Background</h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  I hold a <strong>Diploma in ICT from Coast Institute of Technology</strong>, where I gained comprehensive 
                  knowledge in information and communication technologies. My education provided me with a solid foundation 
                  in both theoretical concepts and practical applications.
                </p>
                <p className="text-lg leading-relaxed">
                  With expertise spanning web development, computer repair, CCTV installation, and networking, 
                  I offer comprehensive technology solutions to meet diverse client needs. Whether you're an individual 
                  needing computer support or a business requiring complete IT infrastructure setup, I have the skills 
                  and experience to deliver exceptional results.
                </p>
                <p className="text-lg leading-relaxed">
                  I am committed to staying current with technological advances and providing reliable, 
                  professional service that exceeds expectations.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Education & Expertise</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Diploma in ICT</h4>
                    <p className="text-gray-600">Coast Institute of Technology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Web Development</h4>
                    <p className="text-gray-600">Full-stack development, modern frameworks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Computer Repair & Maintenance</h4>
                    <p className="text-gray-600">Hardware troubleshooting, software solutions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">CCTV Installation & Repair</h4>
                    <p className="text-gray-600">Security systems for homes and businesses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Computer Networking</h4>
                    <p className="text-gray-600">Network setup, configuration, troubleshooting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT solutions for individuals and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">🌐</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development</h3>
                <p className="text-gray-600 mb-4">
                  Custom websites, web applications, and e-commerce solutions tailored to your needs.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Responsive web design</li>
                  <li>• E-commerce platforms</li>
                  <li>• Content management systems</li>
                  <li>• Web application development</li>
                </ul>
              </div>
            </div>

            {/* Computer Repair */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxjb21wdXRlciUyMHJlcGFpcnxlbnwwfHx8Ymx1ZXwxNzUwNzEwNzUyfDA&ixlib=rb-4.1.0&q=85"
                  alt="Computer Repair"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Computer Repair & Maintenance</h3>
                <p className="text-gray-600 mb-4">
                  Professional hardware troubleshooting, software installation, and system optimization.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Hardware diagnosis & repair</li>
                  <li>• Software installation & updates</li>
                  <li>• System optimization</li>
                  <li>• Data recovery services</li>
                </ul>
              </div>
            </div>

            {/* CCTV Installation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8fGJsdWV8MTc1MDcxMDc2Nnww&ixlib=rb-4.1.0&q=85"
                  alt="CCTV Installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">CCTV Installation & Repair</h3>
                <p className="text-gray-600 mb-4">
                  Professional security camera systems for homes and businesses with ongoing support.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Security camera installation</li>
                  <li>• System configuration</li>
                  <li>• Remote monitoring setup</li>
                  <li>• Maintenance & repairs</li>
                </ul>
              </div>
            </div>

            {/* Networking */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <span className="text-6xl">🔗</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Computer Networking</h3>
                <p className="text-gray-600 mb-4">
                  Network setup, configuration, and troubleshooting for optimal connectivity.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Network design & setup</li>
                  <li>• WiFi configuration</li>
                  <li>• Network security</li>
                  <li>• Troubleshooting & maintenance</li>
                </ul>
              </div>
            </div>

            {/* IT Support */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">💡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">IT Support & Consulting</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive technical support and IT consultation for businesses.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Technical support</li>
                  <li>• IT strategy consulting</li>
                  <li>• System integration</li>
                  <li>• Training & documentation</li>
                </ul>
              </div>
            </div>

            {/* Custom Solutions */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-6xl">⚙️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Tailored technology solutions to meet your specific requirements.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Custom software development</li>
                  <li>• System integration</li>
                  <li>• Technology consulting</li>
                  <li>• Project management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600">What my clients say about my work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah Mitchell</h4>
                  <p className="text-gray-600 text-sm">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Jeremiah set up our entire CCTV system professionally and efficiently. 
                His attention to detail and ongoing support has been exceptional."
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  DK
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">David Kim</h4>
                  <p className="text-gray-600 text-sm">Restaurant Manager</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Our restaurant's computer system was completely revamped by Jeremiah. 
                The new network setup has improved our operations significantly."
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  LT
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Lisa Thompson</h4>
                  <p className="text-gray-600 text-sm">Homeowner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Quick response time and excellent computer repair service. 
                Jeremiah explained everything clearly and fixed the issue perfectly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">
              Ready to discuss your IT needs? Let's start a conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <p className="text-white">jeremiah.james@example.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <p className="text-white">+254 XXX XXX XXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="text-white">Coast Region, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
                <p className="text-gray-300 mb-4">
                  I provide services to both individual clients and businesses throughout the Coast Region 
                  and surrounding areas. Remote support is also available for certain services.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">Individual Clients</span>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">Small Businesses</span>
                  <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">Corporate Services</span>
                  <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">Remote Support</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              {submitMessage && (
                <div className={`mb-4 p-4 rounded-lg ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="computer-repair">Computer Repair</option>
                    <option value="cctv-installation">CCTV Installation</option>
                    <option value="networking">Computer Networking</option>
                    <option value="it-support">IT Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Please describe your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Jeremiah M. James</h3>
            <p className="text-gray-400 mb-6">ICT Specialist & Technology Solutions Expert</p>
            <p className="text-gray-400 text-sm">
              © 2025 Jeremiah M. James. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Diploma in ICT - Coast Institute of Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;