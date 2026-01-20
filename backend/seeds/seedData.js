const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const User = require('../models/User');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const GalleryItem = require('../models/GalleryItem');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dental-clinic');

// Sample Data
const users = [
  {
    name: 'Admin User',
    email: 'admin@dentalclinic.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Staff User',
    email: 'staff@dentalclinic.com',
    password: 'staff123',
    role: 'staff'
  }
];

const services = [
  {
    slug: 'general',
    title: 'General & Preventive Dentistry',
    description: 'Maintain your oral health with comprehensive preventive care designed to keep your smile healthy for life.',
    details: 'Regular dental checkups are the foundation of good oral health. Our preventive care program includes thorough examinations, professional cleanings, and early detection of potential problems. We use the latest digital technology for precise diagnostics and comfortable treatments.',
    features: [
      'Comprehensive Dental Exams',
      'Professional Teeth Cleanings',
      'Digital X-rays & Diagnostics',
      'Fluoride Treatments',
      'Dental Sealants',
      'Oral Cancer Screenings',
      'Gum Disease Treatment',
      'Night Guards & Mouth Guards'
    ],
    icon: 'shield-check',
    order: 1,
    isActive: true
  },
  {
    slug: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with our advanced cosmetic treatments tailored to your aesthetic goals.',
    details: "Your smile is one of the first things people notice. Our cosmetic dentistry services can help you achieve the beautiful, confident smile you've always wanted. From subtle enhancements to complete smile makeovers, we offer personalized solutions for every patient.",
    features: [
      'Professional Teeth Whitening',
      'Porcelain Veneers',
      'Dental Bonding',
      'Smile Makeovers',
      'Gum Contouring',
      'Tooth Reshaping',
      'Cosmetic Crowns',
      'Full Mouth Reconstruction'
    ],
    icon: 'sparkles',
    order: 2,
    isActive: true
  },
  {
    slug: 'whitening',
    title: 'Teeth Whitening',
    description: 'Brighten your smile with professional whitening treatments that deliver dramatic, lasting results.',
    details: 'Professional teeth whitening can dramatically improve your smile in just one visit. Our in-office Zoom whitening can brighten your teeth up to 8 shades in about an hour. We also offer custom take-home kits for gradual whitening on your schedule.',
    features: [
      'In-Office Zoom Whitening',
      'Custom Take-Home Trays',
      'Touch-Up Treatments',
      'Sensitivity-Free Options',
      'Long-Lasting Results',
      'Safe & Effective',
      'Personalized Treatment Plans',
      'Post-Whitening Care'
    ],
    icon: 'sun',
    order: 3,
    isActive: true
  },
  {
    slug: 'restorative',
    title: 'Restorative Dentistry',
    description: 'Repair and restore damaged teeth with durable, natural-looking solutions that blend seamlessly with your smile.',
    details: 'Whether you have a small cavity or need extensive restoration, we offer solutions that look and function like natural teeth. Our tooth-colored materials and advanced techniques ensure beautiful, long-lasting results.',
    features: [
      'Tooth-Colored Fillings',
      'Dental Crowns',
      'Dental Bridges',
      'Root Canal Therapy',
      'Dentures & Partials',
      'Inlays & Onlays',
      'Full Mouth Rehabilitation',
      'Same-Day Crowns'
    ],
    icon: 'heart',
    order: 4,
    isActive: true
  },
  {
    slug: 'implants',
    title: 'Dental Implants',
    description: 'Replace missing teeth with the gold standard in tooth replacement - dental implants that look, feel, and function like natural teeth.',
    details: 'Dental implants are the most advanced solution for replacing missing teeth. They provide a permanent, stable foundation for replacement teeth and help preserve your jawbone. Our precise 3D planning ensures optimal placement and beautiful results.',
    features: [
      'Single Tooth Implants',
      'Implant-Supported Bridges',
      'Implant-Supported Dentures',
      'All-on-4 Full Arch',
      'Bone Grafting',
      '3D Treatment Planning',
      'Mini Implants',
      'Immediate Load Implants'
    ],
    icon: 'building',
    order: 5,
    isActive: true
  },
  {
    slug: 'orthodontics',
    title: 'Orthodontics',
    description: 'Straighten your teeth and perfect your bite with modern orthodontic solutions for patients of all ages.',
    details: 'A straight smile is a healthy smile. Misaligned teeth can lead to problems with chewing, speech, and oral hygiene. We offer various orthodontic options, including nearly invisible Invisalign aligners, to help you achieve a perfectly aligned smile.',
    features: [
      'Invisalign Clear Aligners',
      'Traditional Braces',
      'Clear Ceramic Braces',
      'Retainers',
      'Bite Correction',
      'Early Orthodontic Treatment',
      'Adult Orthodontics',
      'Accelerated Treatment Options'
    ],
    icon: 'clipboard',
    order: 6,
    isActive: true
  },
  {
    slug: 'pediatric',
    title: 'Pediatric Dentistry',
    description: 'Gentle, kid-friendly dental care that makes visits fun and establishes healthy habits for a lifetime of beautiful smiles.',
    details: "We love treating kids! Our warm, friendly approach helps children feel comfortable and even excited about dental visits. We focus on prevention and education, teaching kids how to care for their teeth while making every visit a positive experience.",
    features: [
      'Child-Friendly Exams',
      'Gentle Cleanings',
      'Fluoride Treatments',
      'Dental Sealants',
      'Early Orthodontic Evaluation',
      'Cavity Prevention',
      'Sports Mouth Guards',
      'Education & Fun!'
    ],
    icon: 'smile',
    order: 7,
    isActive: true
  },
  {
    slug: 'emergency',
    title: 'Emergency Dental Care',
    description: "When dental emergencies happen, we're here for you with same-day appointments and compassionate care.",
    details: "Dental emergencies can happen at any time. Whether you're dealing with severe pain, a broken tooth, or trauma, we prioritize emergency patients and work to see you the same day. Call us immediately for urgent dental needs.",
    features: [
      'Same-Day Appointments',
      'Toothache Relief',
      'Broken Tooth Repair',
      'Lost Filling/Crown',
      'Dental Trauma',
      'Abscess Treatment',
      'Emergency Extractions',
      'After-Hours Care Available'
    ],
    icon: 'bolt',
    order: 8,
    isActive: true
  }
];

const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Lead Dentist & Founder',
    bio: 'With over 15 years of experience, Dr. Mitchell is passionate about creating beautiful smiles and ensuring patient comfort.',
    initials: 'SM',
    credentials: [
      { title: 'Doctor of Dental Surgery (DDS)', institution: 'Columbia University College of Dental Medicine', year: '2009' },
      { title: 'Fellowship, Academy of General Dentistry (FAGD)', institution: 'Academy of General Dentistry', year: '2015' },
      { title: 'Advanced Training in Cosmetic Dentistry', institution: 'Las Vegas Institute', year: '2012' },
      { title: 'Invisalign Certified Provider', institution: 'Align Technology', year: '2014' }
    ],
    memberships: [
      'American Dental Association (ADA)',
      'Academy of General Dentistry (AGD)',
      'American Academy of Cosmetic Dentistry (AACD)',
      'State Dental Association',
      'Local Dental Society'
    ],
    order: 1,
    isActive: true
  },
  {
    name: 'Lisa Anderson',
    role: 'Dental Hygienist',
    bio: 'Lisa brings 10 years of experience and a gentle touch to every cleaning and preventive care appointment.',
    initials: 'LA',
    order: 2,
    isActive: true
  },
  {
    name: 'Maria Garcia',
    role: 'Office Manager',
    bio: 'Maria ensures our practice runs smoothly and is always ready to help with scheduling and insurance questions.',
    initials: 'MG',
    order: 3,
    isActive: true
  },
  {
    name: 'James Wilson',
    role: 'Dental Assistant',
    bio: 'James is dedicated to making patients feel comfortable and assists Dr. Mitchell with all procedures.',
    initials: 'JW',
    order: 4,
    isActive: true
  }
];

const testimonials = [
  {
    name: 'Jennifer Thompson',
    role: 'Patient for 5 years',
    content: "Dr. Mitchell is absolutely wonderful! I used to dread going to the dentist, but she made me feel so comfortable from my very first visit. Her gentle approach and clear explanations put all my fears at ease. My whole family now sees her!",
    rating: 5,
    service: 'general',
    date: 'October 2025',
    initials: 'JT',
    isApproved: true,
    isFeatured: true
  },
  {
    name: 'Michael Rodriguez',
    role: 'Patient for 3 years',
    content: "I had my teeth whitened here and the results exceeded my expectations. Dr. Mitchell took the time to understand exactly what I wanted and delivered amazing results. The office is modern, clean, and the staff is incredibly friendly.",
    rating: 5,
    service: 'cosmetic',
    date: 'September 2025',
    initials: 'MR',
    isApproved: true,
    isFeatured: true
  },
  {
    name: 'Sarah Chen',
    role: 'Patient for 2 years',
    content: "Finding a dentist who is great with kids is so important, and Dr. Mitchell is fantastic! My daughter actually looks forward to her dental appointments now. She makes the experience fun and educational for the little ones.",
    rating: 5,
    service: 'pediatric',
    date: 'November 2025',
    initials: 'SC',
    isApproved: true,
    isFeatured: true
  },
  {
    name: 'David Williams',
    role: 'Patient for 7 years',
    content: "After years of neglecting my dental health, I was embarrassed to see a dentist. Dr. Mitchell was non-judgmental and created a manageable treatment plan. Now I have a smile I'm proud of. Forever grateful!",
    rating: 5,
    service: 'restorative',
    date: 'August 2025',
    initials: 'DW',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Emily Parker',
    role: 'Patient for 1 year',
    content: "The emergency care here is exceptional. I chipped my front tooth on a Saturday and Dr. Mitchell saw me the same day. She fixed it perfectly and you can't even tell it was ever broken. Highly recommend!",
    rating: 5,
    service: 'emergency',
    date: 'December 2025',
    initials: 'EP',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Robert Johnson',
    role: 'Patient for 4 years',
    content: "I got dental implants to replace two missing teeth and the results are incredible. They look and feel completely natural. Dr. Mitchell's expertise and attention to detail are unmatched. Worth every penny!",
    rating: 5,
    service: 'implants',
    date: 'July 2025',
    initials: 'RJ',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Lisa Martinez',
    role: 'Patient for 2 years',
    content: "The Invisalign treatment was so much easier than I expected. Dr. Mitchell guided me through every step, and now my smile is perfectly straight. I wish I had done this years ago!",
    rating: 5,
    service: 'orthodontics',
    date: 'June 2025',
    initials: 'LM',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'James Anderson',
    role: 'Patient for 6 years',
    content: "I've been coming here for years for regular cleanings and checkups. The hygienist Lisa is wonderful, and Dr. Mitchell always takes time to explain everything. Truly a five-star experience every time.",
    rating: 5,
    service: 'general',
    date: 'October 2025',
    initials: 'JA',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Amanda Foster',
    role: 'Patient for 3 years',
    content: "My veneers turned out beautiful! I was nervous about such a big change, but Dr. Mitchell showed me digital previews of what to expect. The result is natural-looking and absolutely stunning.",
    rating: 5,
    service: 'cosmetic',
    date: 'September 2025',
    initials: 'AF',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Christopher Lee',
    role: 'Patient for 1 year',
    content: "As someone with severe dental anxiety, I can't say enough good things about this practice. They offer sedation options and the entire team is so patient and understanding. Finally found my dental home!",
    rating: 5,
    service: 'general',
    date: 'November 2025',
    initials: 'CL',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Patricia Brown',
    role: 'Patient for 8 years',
    content: "Dr. Mitchell did a full smile makeover for me - whitening, some bonding, and a crown. The transformation is incredible. I smile so much more now. Thank you for giving me back my confidence!",
    rating: 5,
    service: 'cosmetic',
    date: 'May 2025',
    initials: 'PB',
    isApproved: true,
    isFeatured: false
  },
  {
    name: 'Kevin White',
    role: 'Patient for 4 years',
    content: "Brought my three kids here and they all love it! The kids corner keeps them entertained, and the team makes dental care fun. Dr. Mitchell has a real gift with children.",
    rating: 5,
    service: 'pediatric',
    date: 'August 2025',
    initials: 'KW',
    isApproved: true,
    isFeatured: false
  }
];

const faqs = [
  // General
  {
    question: "What makes Dr. Mitchell's practice different?",
    answer: "Our practice focuses on personalized, patient-centered care. We take the time to understand your unique needs, explain all treatment options clearly, and ensure you feel comfortable every step of the way. With over 15 years of experience and a commitment to continuing education, Dr. Mitchell combines expertise with a gentle, compassionate approach.",
    category: 'general',
    order: 1,
    isActive: true
  },
  {
    question: 'Do you treat patients of all ages?',
    answer: 'Yes! We are a family dental practice and welcome patients of all ages, from toddlers getting their first checkup to seniors maintaining their oral health. We have specialized approaches for pediatric patients to make their visits fun and stress-free.',
    category: 'general',
    order: 2,
    isActive: true
  },
  {
    question: 'What COVID-19 safety measures do you have in place?',
    answer: 'Your safety is our priority. We follow all CDC and ADA guidelines, including enhanced sanitation protocols, HEPA air filtration, mandatory staff PPE, pre-appointment health screenings, and social distancing in our waiting area. Our sterilization procedures have always exceeded industry standards.',
    category: 'general',
    order: 3,
    isActive: true
  },
  {
    question: 'Is your office accessible for patients with disabilities?',
    answer: 'Yes, our office is fully ADA compliant with wheelchair accessibility, accessible restrooms, and accommodations for patients with various needs. Please let us know in advance if you require any special accommodations.',
    category: 'general',
    order: 4,
    isActive: true
  },
  {
    question: 'Do you offer sedation for anxious patients?',
    answer: 'Absolutely! We understand dental anxiety is real and offer several sedation options including nitrous oxide (laughing gas) and oral sedation. We also focus on creating a calming environment and will work at your pace to ensure you feel comfortable.',
    category: 'general',
    order: 5,
    isActive: true
  },
  // Appointments
  {
    question: 'How do I schedule an appointment?',
    answer: 'You can schedule an appointment by calling our office at (555) 123-4567, using our online booking form on the Contact page, or sending us an email. We typically respond within a few hours during business hours.',
    category: 'appointments',
    order: 1,
    isActive: true
  },
  {
    question: 'What are your office hours?',
    answer: 'We are open Monday through Thursday from 8:00 AM to 6:00 PM, Friday from 8:00 AM to 4:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays. We also offer early morning appointments for your convenience.',
    category: 'appointments',
    order: 2,
    isActive: true
  },
  {
    question: 'How long will my appointment take?',
    answer: "Appointment length varies by treatment. A routine cleaning typically takes 45-60 minutes, while a comprehensive new patient exam may take 90 minutes. We'll always let you know the expected duration when scheduling.",
    category: 'appointments',
    order: 3,
    isActive: true
  },
  {
    question: 'What should I bring to my first appointment?',
    answer: 'Please bring your photo ID, insurance card (if applicable), a list of current medications, and any relevant dental records or X-rays from your previous dentist. Arriving 15 minutes early to complete paperwork is helpful.',
    category: 'appointments',
    order: 4,
    isActive: true
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We kindly ask for 24 hours notice if you need to cancel or reschedule. This allows us to offer the appointment time to another patient. Repeated no-shows may result in a scheduling fee.',
    category: 'appointments',
    order: 5,
    isActive: true
  },
  // Insurance
  {
    question: 'What insurance plans do you accept?',
    answer: 'We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, United Healthcare, and Blue Cross Blue Shield. We are happy to verify your benefits and help you understand your coverage.',
    category: 'insurance',
    order: 1,
    isActive: true
  },
  {
    question: 'Do you offer payment plans?',
    answer: "Yes! We believe everyone deserves quality dental care. We offer in-house payment plans, accept CareCredit financing, and can discuss various options to fit treatment into your budget. Ask our team for details.",
    category: 'insurance',
    order: 2,
    isActive: true
  },
  {
    question: "What if I don't have dental insurance?",
    answer: 'No problem! We offer competitive self-pay rates and a discount plan for patients without insurance. This plan includes two cleanings per year, exams, X-rays, and discounts on other treatments.',
    category: 'insurance',
    order: 3,
    isActive: true
  },
  {
    question: 'Will you file my insurance claim?',
    answer: "Yes, we handle all insurance paperwork for you. We'll submit claims on your behalf and help you maximize your benefits. Any estimated patient portion is collected at the time of service.",
    category: 'insurance',
    order: 4,
    isActive: true
  },
  {
    question: 'What forms of payment do you accept?',
    answer: 'We accept cash, personal checks, and all major credit cards (Visa, MasterCard, American Express, Discover). We also accept CareCredit and other healthcare financing options.',
    category: 'insurance',
    order: 5,
    isActive: true
  },
  // Procedures
  {
    question: 'How often should I get my teeth cleaned?',
    answer: 'Most patients benefit from professional cleanings every six months. However, some patients with gum disease or other conditions may need more frequent visits. Dr. Mitchell will recommend a schedule based on your individual needs.',
    category: 'procedures',
    order: 1,
    isActive: true
  },
  {
    question: 'Are dental X-rays safe?',
    answer: 'Yes, our digital X-rays use up to 90% less radiation than traditional X-rays. We follow the ALARA principle (As Low As Reasonably Achievable) and only take X-rays when diagnostically necessary.',
    category: 'procedures',
    order: 2,
    isActive: true
  },
  {
    question: 'How long does teeth whitening last?',
    answer: 'Professional whitening results can last 1-3 years depending on your habits. Avoiding staining foods/drinks and using touch-up treatments can extend your results. We provide custom take-home trays for maintenance.',
    category: 'procedures',
    order: 3,
    isActive: true
  },
  {
    question: 'Is Invisalign right for me?',
    answer: 'Invisalign can treat many orthodontic issues including crowding, spacing, and bite problems. Schedule a consultation and Dr. Mitchell will evaluate your case and discuss whether Invisalign or another treatment is best for you.',
    category: 'procedures',
    order: 4,
    isActive: true
  },
  {
    question: 'How long do dental implants last?',
    answer: 'With proper care, dental implants can last a lifetime. The crown on top may need replacement after 10-15 years due to normal wear. Regular checkups and good oral hygiene are essential for implant longevity.',
    category: 'procedures',
    order: 5,
    isActive: true
  },
  {
    question: 'What is a root canal and is it painful?',
    answer: 'A root canal removes infected tissue from inside a tooth, saving it from extraction. With modern techniques and anesthesia, the procedure is no more uncomfortable than getting a filling. Most patients feel relief from the pain caused by the infection.',
    category: 'procedures',
    order: 6,
    isActive: true
  },
  // Emergency
  {
    question: 'What qualifies as a dental emergency?',
    answer: "Dental emergencies include severe toothache, knocked-out tooth, cracked/broken tooth, lost filling or crown, abscess or swelling, bleeding that won't stop, and trauma to the mouth. When in doubt, call us!",
    category: 'emergency',
    order: 1,
    isActive: true
  },
  {
    question: 'Do you offer same-day emergency appointments?',
    answer: 'Yes! We prioritize emergency patients and strive to see you the same day. Call our office immediately at (555) 123-4567. For after-hours emergencies, our voicemail has instructions for reaching Dr. Mitchell.',
    category: 'emergency',
    order: 2,
    isActive: true
  },
  {
    question: 'What should I do if I knock out a tooth?',
    answer: "Time is critical! Pick up the tooth by the crown (not the root), gently rinse if dirty, and try to place it back in the socket. If that's not possible, keep it in milk or saliva. Call us immediately – the best chance of saving the tooth is within 30 minutes.",
    category: 'emergency',
    order: 3,
    isActive: true
  },
  {
    question: 'How can I manage tooth pain until I can see the dentist?',
    answer: 'Over-the-counter pain relievers like ibuprofen can help. Apply a cold compress to reduce swelling. Avoid very hot, cold, or sweet foods. Rinse with warm salt water. Do not put aspirin directly on the gum as this can burn tissue.',
    category: 'emergency',
    order: 4,
    isActive: true
  },
  {
    question: 'What if my dental emergency happens after hours?',
    answer: 'Call our main office number and follow the instructions for after-hours emergencies. Dr. Mitchell provides guidance for urgent situations and can arrange to see you if medically necessary.',
    category: 'emergency',
    order: 5,
    isActive: true
  }
];

const galleryItems = [
  // Office
  { title: 'Reception Area', description: 'Our welcoming front desk and comfortable waiting area', category: 'office', order: 1, isActive: true },
  { title: 'Treatment Room 1', description: 'State-of-the-art treatment room with the latest equipment', category: 'office', order: 2, isActive: true },
  { title: 'Treatment Room 2', description: 'Comfortable environment with calming views', category: 'office', order: 3, isActive: true },
  { title: 'Consultation Room', description: 'Private space for discussing treatment plans', category: 'office', order: 4, isActive: true },
  { title: 'Sterilization Center', description: 'Hospital-grade sterilization for your safety', category: 'office', order: 5, isActive: true },
  { title: 'Kids Corner', description: 'Fun play area for our youngest patients', category: 'office', order: 6, isActive: true },
  // Smiles
  { title: 'Teeth Whitening Case', description: 'Professional whitening - 8 shades brighter', category: 'smiles', order: 1, isActive: true },
  { title: 'Veneer Transformation', description: 'Complete smile makeover with porcelain veneers', category: 'smiles', order: 2, isActive: true },
  { title: 'Invisalign Results', description: '18-month Invisalign treatment', category: 'smiles', order: 3, isActive: true },
  { title: 'Dental Implant Case', description: 'Single tooth implant replacement', category: 'smiles', order: 4, isActive: true },
  { title: 'Crown Restoration', description: 'Full ceramic crown on damaged tooth', category: 'smiles', order: 5, isActive: true },
  { title: 'Full Smile Makeover', description: 'Comprehensive treatment including whitening, veneers, and gum contouring', category: 'smiles', order: 6, isActive: true },
  // Team
  { title: 'Dr. Sarah Mitchell', description: 'Lead Dentist & Founder', role: 'DDS, FAGD', category: 'team', order: 1, isActive: true },
  { title: 'Lisa Anderson', description: 'Dental Hygienist', role: '10+ years experience', category: 'team', order: 2, isActive: true },
  { title: 'Maria Garcia', description: 'Office Manager', role: 'Your first point of contact', category: 'team', order: 3, isActive: true },
  { title: 'James Wilson', description: 'Dental Assistant', role: 'Certified DA', category: 'team', order: 4, isActive: true },
  { title: 'Team Meeting', description: 'Our weekly huddle to discuss patient care', role: 'Collaboration', category: 'team', order: 5, isActive: true },
  { title: 'Community Event', description: 'Participating in local health fair', role: 'Community Care', category: 'team', order: 6, isActive: true },
  // Technology
  { title: 'Digital X-Rays', description: '90% less radiation than traditional X-rays', category: 'technology', order: 1, isActive: true },
  { title: '3D Cone Beam CT', description: 'Precise imaging for implant planning', category: 'technology', order: 2, isActive: true },
  { title: 'Intraoral Camera', description: 'See exactly what we see in your mouth', category: 'technology', order: 3, isActive: true },
  { title: 'CEREC Same-Day Crowns', description: 'Custom crowns in a single visit', category: 'technology', order: 4, isActive: true },
  { title: 'Laser Dentistry', description: 'Minimally invasive soft tissue treatments', category: 'technology', order: 5, isActive: true },
  { title: 'Digital Impressions', description: 'Comfortable, accurate scans - no messy putty', category: 'technology', order: 6, isActive: true }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await TeamMember.deleteMany();
    await Testimonial.deleteMany();
    await FAQ.deleteMany();
    await GalleryItem.deleteMany();

    console.log('Existing data cleared...');

    // Import new data
    await User.create(users);
    console.log('Users created...');

    await Service.create(services);
    console.log('Services created...');

    await TeamMember.create(teamMembers);
    console.log('Team members created...');

    await Testimonial.create(testimonials);
    console.log('Testimonials created...');

    await FAQ.create(faqs);
    console.log('FAQs created...');

    await GalleryItem.create(galleryItems);
    console.log('Gallery items created...');

    console.log('\n=================================');
    console.log('Data imported successfully!');
    console.log('=================================\n');
    console.log('Admin login credentials:');
    console.log('Email: admin@dentalclinic.com');
    console.log('Password: admin123');
    console.log('=================================\n');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Service.deleteMany();
    await TeamMember.deleteMany();
    await Testimonial.deleteMany();
    await FAQ.deleteMany();
    await GalleryItem.deleteMany();

    console.log('Data destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
