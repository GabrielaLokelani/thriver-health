import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      {/* Header */}
      <header className="bg-surface-10/80 backdrop-blur-xl border-b border-surface-20" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                boxShadow: '0 4px 15px rgba(255, 132, 0, 0.25)'
              }}
            >
              <Shield size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-display">Privacy Policy</h1>
              <p className="text-gray-400 text-sm">Effective Date: December 21, 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
          style={{
            color: '#e5e5e5'
          }}
        >
          <div className="space-y-8">
            <section>
              <p className="text-gray-300 leading-relaxed">
                At ThriverHealth.Ai, Inc. (referred to as "we," "us," "our," or "Company"), we are deeply committed to protecting your privacy and handling your personal information responsibly, in line with our mission to empower users on their thriver journeys through ethical, transparent practices. This Privacy Policy explains how we collect, use, disclose, protect, and retain your information when you access or use our mobile application, website, and related services (collectively, the "Platform"). It applies to all users, including those sharing health anecdotes, practitioners contributing insights, and partners in our marketplace.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                By using the Platform, you consent to the practices described herein. Our Terms of Use (available at <Link to="/terms-of-service" className="text-primary-0 hover:underline">/terms-of-service</Link>) govern overall use and reference this Policy. We may update this Policy at any time; material changes will be notified via the Platform, email, or in-app alerts. Your continued use constitutes acceptance. Review periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed">
                We collect information to deliver personalized, valuable services like curated health content, community interactions, marketplace features, and individualized programs or e-books. Categories include:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Personal Identifiers:</strong> Name, email address, username, password, age, gender, location (e.g., city, state, country), phone number, or other details provided during registration or profile creation.</li>
                <li><strong>Health and Sensitive Information:</strong> Voluntarily shared details about your health conditions, diagnoses, symptoms, treatments (conventional or alternative), abilities, resources, lifestyle choices, dietary preferences, or other sensitive data (e.g., for generating individualized programs). This may include crowdsourced anecdotes or expert contributions.</li>
                <li><strong>User Content and Interactions:</strong> Posts, comments, forum discussions, uploaded media (e.g., images of health progress), or shared anecdotes.</li>
                <li><strong>Transaction and Financial Data:</strong> Payment details (e.g., credit card info, processed via secure third-party providers like Stripe), purchase history, shipping addresses, or billing information for marketplace transactions.</li>
                <li><strong>Usage and Device Data:</strong> Automatically collected via cookies, web beacons, pixels, or similar technologies: IP address, device type/ID, browser type, operating system, access times, pages viewed, referral sources, interactions (e.g., clicks, searches), and inferred preferences.</li>
                <li><strong>Location Data:</strong> Approximate location from IP or device settings (with consent) to tailor content (e.g., local practitioners).</li>
                <li><strong>Inferred or Derived Data:</strong> Insights derived from your inputs (e.g., health trends from program data) or aggregated analytics.</li>
                <li><strong>Third-Party Data:</strong> Information from partners, vendors, social logins (e.g., Google), or integrations (e.g., if you link fitness apps).</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                We minimize collection to what's necessary and anonymize/de-identify where possible (e.g., for research aggregates).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Collect Information</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Directly from You:</strong> Through registration forms, surveys, forum posts, data uploads for programs, marketplace checkouts, or support inquiries.</li>
                <li><strong>Automatically:</strong> Via tracking technologies like cookies (essential for functionality, analytics for improvements, marketing for personalized ads). You can manage preferences via browser settings or our cookie banner; however, disabling may limit features. We use tools like Google Analytics (subject to their policies).</li>
                <li><strong>From Third Parties:</strong> Analytics providers, payment processors, advertising networks, or partners (e.g., practitioner-verified data). If you connect external accounts, we collect authorized data.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">For cookies/tracking:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Types:</strong> Session (temporary), persistent (stored), first-party (ours), third-party (e.g., ads).</li>
                <li><strong>Purposes:</strong> Authentication, preferences, performance monitoring, targeted content.</li>
                <li><strong>Opt-Out:</strong> Use our cookie consent tool, browser Do Not Track, or global opt-outs (e.g., NAI, DAA). For ads, visit Google Ads Settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed">
                We use information ethically to support your thriver journey:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>Provide and personalize services (e.g., curating content on therapies, generating e-books based on your condition/age).</li>
                <li>Facilitate community interactions, marketplace transactions, and crowdsourced summaries.</li>
                <li>Improve the Platform (e.g., analyzing usage trends, debugging, A/B testing—using anonymized data).</li>
                <li>Communicate (e.g., newsletters, updates, support responses—with opt-out options).</li>
                <li>Conduct research (aggregated/de-identified, e.g., therapy efficacy insights).</li>
                <li>Comply with laws, enforce Terms, prevent fraud/abuse, or protect rights/safety.</li>
                <li>Marketing (with consent), such as tailored recommendations or partner promotions.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                We do not use sensitive health data for automated decisions with significant impacts without explicit consent. Data may inform AI enhancements (anonymized only).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-300 leading-relaxed">
                We share sparingly, with safeguards:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Service Providers:</strong> Vendors for hosting, analytics, payments, email, or moderation (bound by contracts limiting use).</li>
                <li><strong>Partners and Vendors:</strong> Anonymized/aggregated data with practitioners, facilities, or retailers to enhance content/marketplace (e.g., trend insights). No identifiable health data without consent.</li>
                <li><strong>Legal/Compliance:</strong> If required by law, subpoena, court order, or to prevent harm (e.g., fraud, emergencies).</li>
                <li><strong>Business Transfers:</strong> In mergers, acquisitions, or sales (with notice where possible).</li>
                <li><strong>With Your Consent:</strong> E.g., public forum shares or explicit opt-ins for partner communications.</li>
                <li><strong>Aggregated/De-Identified:</strong> For research or benchmarking (not re-identifiable).</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                We do not sell personal information (as defined under CCPA). No sharing with unaffiliated third parties for their independent marketing without consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security and Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We employ industry-standard measures: encryption (in transit/rest), access controls, firewalls, regular audits, and employee training. For health data, we use enhanced protocols (e.g., pseudonymization). In breaches, we notify affected users/authorities per laws (e.g., within 72 hours under GDPR).
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong>Retention:</strong> As long as needed for purposes (e.g., active account duration) or legally required. Inactive accounts may be deleted after 2 years; de-identified data retained indefinitely for research. You can request deletion (subject to exceptions).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Privacy Rights and Choices</h2>
              <p className="text-gray-300 leading-relaxed">
                You control your data:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Access/Correct/Delete:</strong> Request your information, updates, or erasure.</li>
                <li><strong>Opt-Outs:</strong> Marketing emails (unsubscribe links), cookies (banner/settings), sharing (via account).</li>
                <li><strong>Do Not Sell/Share:</strong> For CCPA-eligible (California residents): We don't sell, but opt-out of sharing for targeted ads.</li>
                <li><strong>Portability:</strong> Receive data in structured format.</li>
                <li><strong>Withdraw Consent:</strong> Anytime, though it may limit services.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise: Email privacy@thriverhealth.ai with verification. We respond within 30-45 days (per laws); no fees unless excessive. No discrimination for rights exercise.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">California-Specific (CCPA/CPRA):</h3>
              <p className="text-gray-300 leading-relaxed">
                Categories collected/shared (past 12 months): Identifiers (shared with providers), health info (not shared identifiably), usage (analytics). Purposes: As above. Rights include "shine the light" disclosures; authorized agents ok with proof.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">EU/EEA (GDPR):</h3>
              <p className="text-gray-300 leading-relaxed">
                Lawful bases: Consent, contract, legitimate interests. Rights include objection; Data Protection Officer via privacy email. Complaints to supervisory authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Data is processed in the U.S. (with potential global servers). For non-U.S. users, transfers use safeguards like Standard Contractual Clauses or adequacy decisions. Consent to U.S. processing (which may offer different protections).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Links and Services</h2>
              <p className="text-gray-300 leading-relaxed">
                Links to third-party sites (e.g., partner stores) are not governed by this Policy—review theirs. We aren't responsible for their practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                The Platform is for adults 18+. We do not knowingly collect data from children under 13 (or 16 in some jurisdictions). If discovered, we delete promptly. Parents: Contact us for concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. HIPAA Notice of Privacy Practices (Conditional)</h2>
              <p className="text-gray-300 leading-relaxed">
                This applies only if features involve Protected Health Information (PHI) under HIPAA (e.g., medical record uploads). Currently, we're not a covered entity/business associate, but if activated:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Uses/Disclosures:</strong> For services (with authorization), treatment coordination, legal requirements.</li>
                <li><strong>Rights:</strong> Access/amend PHI, accounting, restrictions, confidential communications.</li>
                <li><strong>Duties:</strong> Safeguards, minimum necessary use, breach notifications (within 60 days).</li>
                <li><strong>Complaints:</strong> To us or HHS Secretary.</li>
                <li><strong>Contact:</strong> hipaa@thriverhealth.ai.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                Questions or concerns? Email privacy@thriverhealth.ai or mail: ThriverHealth.Ai, LLC, PO BOX 820, Honolulu, Hawaii 96808.
              </p>
            </section>

            <section className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <p className="text-white font-semibold">
                By using the Platform, you acknowledge understanding this Policy.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
