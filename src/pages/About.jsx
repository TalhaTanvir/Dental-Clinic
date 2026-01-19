import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const About = () => {
  const credentials = [
    { title: 'Doctor of Dental Surgery (DDS)', institution: 'Columbia University College of Dental Medicine', year: '2009' },
    { title: 'Fellowship, Academy of General Dentistry (FAGD)', institution: 'Academy of General Dentistry', year: '2015' },
    { title: 'Advanced Training in Cosmetic Dentistry', institution: 'Las Vegas Institute', year: '2012' },
    { title: 'Invisalign Certified Provider', institution: 'Align Technology', year: '2014' },
  ];

  const memberships = [
    'American Dental Association (ADA)',
    'Academy of General Dentistry (AGD)',
    'American Academy of Cosmetic Dentistry (AACD)',
    'State Dental Association',
    'Local Dental Society',
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Compassionate Care',
      description: 'We treat every patient with kindness, empathy, and respect. Your comfort and well-being are our top priorities.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Excellence & Innovation',
      description: 'We stay at the forefront of dental technology and techniques to provide you with the best possible care.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Patient Education',
      description: 'We believe in empowering our patients with knowledge to make informed decisions about their oral health.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Integrity & Trust',
      description: 'We build lasting relationships with our patients based on honesty, transparency, and mutual respect.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Lead Dentist & Founder',
      bio: 'With over 15 years of experience, Dr. Mitchell is passionate about creating beautiful smiles and ensuring patient comfort.',
      initials: 'SM',
    },
    {
      name: 'Lisa Anderson',
      role: 'Dental Hygienist',
      bio: 'Lisa brings 10 years of experience and a gentle touch to every cleaning and preventive care appointment.',
      initials: 'LA',
    },
    {
      name: 'Maria Garcia',
      role: 'Office Manager',
      bio: 'Maria ensures our practice runs smoothly and is always ready to help with scheduling and insurance questions.',
      initials: 'MG',
    },
    {
      name: 'James Wilson',
      role: 'Dental Assistant',
      bio: 'James is dedicated to making patients feel comfortable and assists Dr. Mitchell with all procedures.',
      initials: 'JW',
    },
  ];

  const stats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '5,000+', label: 'Happy Patients' },
    { value: '10,000+', label: 'Procedures Completed' },
    { value: '98%', label: 'Patient Satisfaction' },
  ];

  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Learn about our practice, our values, and the team dedicated to your smile."
        breadcrumbs={[{ name: 'About' }]}
      />

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span className="text-sm font-semibold">Our Story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                A Practice Built on <span className="text-primary-600">Trust & Care</span>
              </h2>

              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, our practice was built on a simple belief: everyone deserves 
                access to high-quality dental care in a comfortable, welcoming environment. 
                What started as a small practice has grown into a trusted cornerstone of our 
                community's healthcare.
              </p>

              <p className="text-gray-600 mb-6">
                Dr. Sarah Mitchell established this practice after recognizing a gap in 
                personalized dental care. Too often, patients felt like just another number. 
                We changed that. Here, you're a valued member of our dental family, and your 
                unique needs guide every treatment decision.
              </p>

              <p className="text-gray-600 mb-8">
                Over the years, we've invested in the latest technology and continued education 
                to ensure we can offer you the most advanced treatments available. But we've 
                never lost sight of what matters most: your comfort, your health, and your smile.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-2">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src="/images/Doctor 2.jpg" 
                      alt="Dr. Sarah Mitchell" 
                      className="w-full h-full object-cover object-[center_15%]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white">Dr. Sarah Mitchell</h3>
                      <p className="text-primary-300 font-medium">DDS, FAGD</p>
                      <p className="text-gray-300 mt-1">Lead Dentist & Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-semibold">Our Values</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What We <span className="text-primary-600">Stand For</span>
            </h2>

            <p className="text-lg text-gray-600">
              Our core values guide everything we do, from patient care to community involvement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-semibold">Our Team</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meet the <span className="text-primary-600">People Behind the Smiles</span>
            </h2>

            <p className="text-lg text-gray-600">
              Our dedicated team is committed to providing you with exceptional care and a positive experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg">
                  <span className="text-4xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Education & Credentials */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span className="text-sm font-semibold">Education & Credentials</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Dr. Mitchell's <span className="text-primary-600">Qualifications</span>
              </h2>

              <div className="space-y-6">
                {credentials.map((cred, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{cred.title}</h3>
                        <p className="text-gray-600">{cred.institution}</p>
                        <p className="text-sm text-primary-600">{cred.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memberships */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span className="text-sm font-semibold">Professional Memberships</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Affiliations & <span className="text-primary-600">Associations</span>
              </h2>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <ul className="space-y-4">
                  {memberships.map((membership, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{membership}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 bg-primary-500 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Continuing Education</h3>
                <p className="text-white/80 mb-4">
                  Dr. Mitchell completes over 50 hours of continuing education annually to stay 
                  current with the latest advancements in dental care and technology.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Tour CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Take a Virtual Tour of Our Office
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                See our modern, comfortable facility and state-of-the-art equipment in our gallery.
              </p>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:shadow-lg"
              >
                View Gallery
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
