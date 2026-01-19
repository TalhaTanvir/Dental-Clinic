import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'appointments', name: 'Appointments' },
    { id: 'insurance', name: 'Insurance & Payment' },
    { id: 'procedures', name: 'Procedures' },
    { id: 'emergency', name: 'Emergencies' },
  ];

  const faqs = {
    general: [
      {
        question: 'What makes Dr. Mitchell\'s practice different?',
        answer: 'Our practice focuses on personalized, patient-centered care. We take the time to understand your unique needs, explain all treatment options clearly, and ensure you feel comfortable every step of the way. With over 15 years of experience and a commitment to continuing education, Dr. Mitchell combines expertise with a gentle, compassionate approach.',
      },
      {
        question: 'Do you treat patients of all ages?',
        answer: 'Yes! We are a family dental practice and welcome patients of all ages, from toddlers getting their first checkup to seniors maintaining their oral health. We have specialized approaches for pediatric patients to make their visits fun and stress-free.',
      },
      {
        question: 'What COVID-19 safety measures do you have in place?',
        answer: 'Your safety is our priority. We follow all CDC and ADA guidelines, including enhanced sanitation protocols, HEPA air filtration, mandatory staff PPE, pre-appointment health screenings, and social distancing in our waiting area. Our sterilization procedures have always exceeded industry standards.',
      },
      {
        question: 'Is your office accessible for patients with disabilities?',
        answer: 'Yes, our office is fully ADA compliant with wheelchair accessibility, accessible restrooms, and accommodations for patients with various needs. Please let us know in advance if you require any special accommodations.',
      },
      {
        question: 'Do you offer sedation for anxious patients?',
        answer: 'Absolutely! We understand dental anxiety is real and offer several sedation options including nitrous oxide (laughing gas) and oral sedation. We also focus on creating a calming environment and will work at your pace to ensure you feel comfortable.',
      },
    ],
    appointments: [
      {
        question: 'How do I schedule an appointment?',
        answer: 'You can schedule an appointment by calling our office at (555) 123-4567, using our online booking form on the Contact page, or sending us an email. We typically respond within a few hours during business hours.',
      },
      {
        question: 'What are your office hours?',
        answer: 'We are open Monday through Thursday from 8:00 AM to 6:00 PM, Friday from 8:00 AM to 4:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays. We also offer early morning appointments for your convenience.',
      },
      {
        question: 'How long will my appointment take?',
        answer: 'Appointment length varies by treatment. A routine cleaning typically takes 45-60 minutes, while a comprehensive new patient exam may take 90 minutes. We\'ll always let you know the expected duration when scheduling.',
      },
      {
        question: 'What should I bring to my first appointment?',
        answer: 'Please bring your photo ID, insurance card (if applicable), a list of current medications, and any relevant dental records or X-rays from your previous dentist. Arriving 15 minutes early to complete paperwork is helpful.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'We kindly ask for 24 hours notice if you need to cancel or reschedule. This allows us to offer the appointment time to another patient. Repeated no-shows may result in a scheduling fee.',
      },
    ],
    insurance: [
      {
        question: 'What insurance plans do you accept?',
        answer: 'We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, United Healthcare, and Blue Cross Blue Shield. We are happy to verify your benefits and help you understand your coverage.',
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes! We believe everyone deserves quality dental care. We offer in-house payment plans, accept CareCredit financing, and can discuss various options to fit treatment into your budget. Ask our team for details.',
      },
      {
        question: 'What if I don\'t have dental insurance?',
        answer: 'No problem! We offer competitive self-pay rates and a discount plan for patients without insurance. This plan includes two cleanings per year, exams, X-rays, and discounts on other treatments.',
      },
      {
        question: 'Will you file my insurance claim?',
        answer: 'Yes, we handle all insurance paperwork for you. We\'ll submit claims on your behalf and help you maximize your benefits. Any estimated patient portion is collected at the time of service.',
      },
      {
        question: 'What forms of payment do you accept?',
        answer: 'We accept cash, personal checks, and all major credit cards (Visa, MasterCard, American Express, Discover). We also accept CareCredit and other healthcare financing options.',
      },
    ],
    procedures: [
      {
        question: 'How often should I get my teeth cleaned?',
        answer: 'Most patients benefit from professional cleanings every six months. However, some patients with gum disease or other conditions may need more frequent visits. Dr. Mitchell will recommend a schedule based on your individual needs.',
      },
      {
        question: 'Are dental X-rays safe?',
        answer: 'Yes, our digital X-rays use up to 90% less radiation than traditional X-rays. We follow the ALARA principle (As Low As Reasonably Achievable) and only take X-rays when diagnostically necessary.',
      },
      {
        question: 'How long does teeth whitening last?',
        answer: 'Professional whitening results can last 1-3 years depending on your habits. Avoiding staining foods/drinks and using touch-up treatments can extend your results. We provide custom take-home trays for maintenance.',
      },
      {
        question: 'Is Invisalign right for me?',
        answer: 'Invisalign can treat many orthodontic issues including crowding, spacing, and bite problems. Schedule a consultation and Dr. Mitchell will evaluate your case and discuss whether Invisalign or another treatment is best for you.',
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper care, dental implants can last a lifetime. The crown on top may need replacement after 10-15 years due to normal wear. Regular checkups and good oral hygiene are essential for implant longevity.',
      },
      {
        question: 'What is a root canal and is it painful?',
        answer: 'A root canal removes infected tissue from inside a tooth, saving it from extraction. With modern techniques and anesthesia, the procedure is no more uncomfortable than getting a filling. Most patients feel relief from the pain caused by the infection.',
      },
    ],
    emergency: [
      {
        question: 'What qualifies as a dental emergency?',
        answer: 'Dental emergencies include severe toothache, knocked-out tooth, cracked/broken tooth, lost filling or crown, abscess or swelling, bleeding that won\'t stop, and trauma to the mouth. When in doubt, call us!',
      },
      {
        question: 'Do you offer same-day emergency appointments?',
        answer: 'Yes! We prioritize emergency patients and strive to see you the same day. Call our office immediately at (555) 123-4567. For after-hours emergencies, our voicemail has instructions for reaching Dr. Mitchell.',
      },
      {
        question: 'What should I do if I knock out a tooth?',
        answer: 'Time is critical! Pick up the tooth by the crown (not the root), gently rinse if dirty, and try to place it back in the socket. If that\'s not possible, keep it in milk or saliva. Call us immediately – the best chance of saving the tooth is within 30 minutes.',
      },
      {
        question: 'How can I manage tooth pain until I can see the dentist?',
        answer: 'Over-the-counter pain relievers like ibuprofen can help. Apply a cold compress to reduce swelling. Avoid very hot, cold, or sweet foods. Rinse with warm salt water. Do not put aspirin directly on the gum as this can burn tissue.',
      },
      {
        question: 'What if my dental emergency happens after hours?',
        answer: 'Call our main office number and follow the instructions for after-hours emergencies. Dr. Mitchell provides guidance for urgent situations and can arrange to see you if medically necessary.',
      },
    ],
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our practice, treatments, and policies."
        breadcrumbs={[{ name: 'FAQ' }]}
      />

      {/* Category Tabs */}
      <section className="py-8 bg-white border-b sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs[activeCategory].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 text-gray-600 border-t">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Can't find the answer you're looking for? We're here to help! 
                  Reach out to our friendly team and we'll get back to you as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:shadow-lg"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="tel:+15551234567"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <svg className="w-10 h-10 mx-auto text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-white font-semibold">Email Us</p>
                  <p className="text-white/70 text-sm">hello@drmitchell.com</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <svg className="w-10 h-10 mx-auto text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white font-semibold">Response Time</p>
                  <p className="text-white/70 text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
