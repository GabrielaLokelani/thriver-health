import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
              <FileText size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-display">Terms of Use</h1>
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
                Welcome to ThriverHealth.Ai (the "Platform"), operated by ThriverHealth.Ai, Inc. (referred to as "we," "us," "our," or "Company"). These Terms of Use ("Terms") govern your access to and use of our mobile application, website, and related services (collectively, the "Platform"). By accessing or using the Platform, creating an account, clicking "I Agree," or otherwise indicating acceptance, you agree to be bound by these Terms, as well as any additional guidelines, rules, or policies we may provide (e.g., Community Guidelines or Marketplace Rules, incorporated herein by reference). Our Privacy Policy (available at <Link to="/privacy-policy" className="text-primary-0 hover:underline">/privacy-policy</Link>) governs data handling and is separate but complementary—please review it carefully.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                If you do not agree to these Terms, you must not access or use the Platform. We may revise these Terms at any time by posting updates on the Platform or notifying you via email or in-app alerts. Your continued use after such changes constitutes acceptance. It is your responsibility to review periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                Your use of the Platform constitutes your agreement to these Terms. If you are using the Platform on behalf of an entity (e.g., a healthcare practitioner or organization), you represent that you have authority to bind that entity, and "you" refers to both you and the entity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility and Account Registration</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Platform. The Platform is not intended for children under 18, and we do not knowingly collect personal information from them. If we discover such use, we may terminate the account and delete data in compliance with applicable laws (e.g., COPPA in the U.S.).</li>
                <li>To access features like community forums, individualized programs, marketplace, or data uploads, you must register an account with accurate, current information. You are responsible for safeguarding your credentials and all activities under your account, including unauthorized access.</li>
                <li>We reserve the right to refuse registration, suspend, or terminate accounts for any reason, including violations of these Terms, fraud, or legal requirements. You must notify us immediately of any unauthorized use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Platform Content and Services</h2>
              <p className="text-gray-300 leading-relaxed">
                The Platform offers informational resources on health conditions, conventional treatments, alternative/adjunct therapies, lifestyle strategies, and more, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>Curated summaries of crowdsourced anecdotal data from experts and practitioners.</li>
                <li>Community forums for sharing and interaction.</li>
                <li>Marketplace for third-party products/services (e.g., supplements, consultations).</li>
                <li>Individualized programs or e-books based on user inputs (e.g., age, condition, resources).</li>
                <li>Potential future features, such as data integrations or uploads (subject to consents).</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                All content is educational and informational only—not medical advice. Services may evolve; we will notify users of material changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Content and Submissions</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>You may submit content ("User Content"), such as posts, comments, health anecdotes, images, videos, audio, or data uploads (e.g., for individualized programs). You retain ownership but grant us a worldwide, perpetual, irrevocable, royalty-free, sublicensable license to use, reproduce, modify, distribute, display, analyze, and create derivative works from it in connection with the Platform, our services, and promotions (e.g., anonymized aggregates for insights).</li>
                <li>For media uploads (images/videos/audio), you represent you own rights or have permissions, including from depicted individuals, and no content includes identifiable minors without guardian consent.</li>
                <li>You are solely responsible for your User Content. It must be accurate, lawful, and non-infringing. We may (but are not obligated to) review, edit, remove, or refuse content. Report violations via support@thriverhealth.ai.</li>
                <li>Prohibited User Content includes: false/misleading health claims, spam, harassment, obscenity, hate speech, viruses/malware, illegal activities, unprotected sensitive data (e.g., PHI without consent), infringement of IP/privacy rights, or promotion of unverified treatments as cures. Violations may result in termination, legal action, or reporting to authorities.</li>
                <li>Public areas (e.g., forums) are not private; do not share confidential information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Partners, Vendors, Marketplace, and Advertisements</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>The Platform may include third-party content, products, services, or ads ("Third-Party Materials") from partners, vendors, practitioners, or advertisers. We do not endorse, control, or assume responsibility for them. Interactions/transactions are solely between you and the third party; review their terms/policies.</li>
                <li>Advertisements are not recommendations. We disclaim liability for Third-Party Materials, including accuracy, efficacy, delivery, or disputes.</li>
                <li>If features involve integrations (e.g., with EHRs), additional consents and agreements may apply.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>Platform content (excluding User Content), including text, graphics, logos, algorithms, summaries, and AI outputs, is owned by us or licensors, protected by copyright, trademark, patent, and other laws (e.g., U.S. Copyright Act).</li>
                <li>You receive a limited, revocable, non-sublicensable license for personal, non-commercial use. No reproduction, distribution, modification, or commercial exploitation without written consent.</li>
                <li>Trademarks (e.g., "ThriverHealth.Ai") may not be used without permission.</li>
                <li><strong>DMCA Policy:</strong> We respect IP rights. If you believe content infringes your copyright, submit a notice to our agent at dmca@thriverhealth.ai with: (i) signature; (ii) identification of work; (iii) infringing material location; (iv) your contact info; (v) good-faith belief; (vi) accuracy statement under perjury. We may remove allegedly infringing content and terminate repeat infringers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Medical, Health, and Data Disclaimers</h2>
              <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(255, 132, 0, 0.1)', border: '1px solid rgba(255, 132, 0, 0.3)' }}>
                <p className="text-orange-300 font-bold text-lg mb-2">IMPORTANT: THE PLATFORM DOES NOT PROVIDE MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.</p>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>All content, including on conventional/alternative therapies, anecdotes, programs, or e-books, is for general informational/educational purposes only. It is not a substitute for professional medical advice from qualified healthcare providers.</li>
                <li>Alternative therapies may lack peer-reviewed evidence; we make no representations on safety, efficacy, or suitability. Always consult physicians before changes to treatment, diet, supplements, or lifestyle. Do not delay seeking care or disregard professional advice based on Platform information.</li>
                <li>For emergencies, contact your doctor, call 911, or seek immediate help.</li>
                <li>AI-generated content may contain errors, biases, or inaccuracies; no warranties on accuracy, completeness, timeliness, or fitness.</li>
                <li>Reliance on any information is at your sole risk. We disclaim all warranties, express or implied (e.g., merchantability, non-infringement).</li>
                <li><strong>HIPAA/PHI Note:</strong> We are not currently a HIPAA-covered entity or business associate. If you upload PHI or features expand, you consent to processing per our Privacy Policy, with HIPAA-compliant safeguards. Do not upload PHI without explicit consent; you represent compliance with laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed font-semibold mb-3">TO THE FULLEST EXTENT PERMITTED BY LAW:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>The Platform is provided "AS IS" and "AS AVAILABLE" without warranties.</li>
                <li>We, our affiliates, officers, directors, employees, agents, partners, licensors, and vendors shall not be liable for indirect, incidental, special, consequential, punitive, or exemplary damages (e.g., lost profits, data loss, personal injury, emotional distress) arising from use, content, Third-Party Materials, or interruptions.</li>
                <li>Our total liability is limited to the greater of $20 or amounts you paid us in the prior 2 months.</li>
                <li>This applies regardless of theory (contract, tort, negligence) and even if advised of damages. Claims must be brought within one year. Some jurisdictions limit this; it applies as permitted.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless us, our affiliates, officers, directors, employees, agents, partners, licensors, and vendors from claims, liabilities, damages, costs, and expenses (including attorneys' fees) arising from: (i) your use or misuse of the Platform; (ii) your User Content or violations of these Terms/laws; (iii) your reliance on content or interactions with third parties; (iv) any harm from your actions/decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law and Dispute Resolution</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li>These Terms are governed by the laws of the State of Delaware, U.S., without conflict principles. For international users, supplemental rights (e.g., under GDPR) may apply via our Privacy Policy.</li>
                <li>Disputes shall be resolved through binding arbitration in Honolulu, Hawaii, under American Arbitration Association rules (consumer rules if applicable). No class actions or jury trials; awards limited to individual claims.</li>
                <li>For certain claims (e.g., IP enforcement, injunctive relief), we may seek court remedies. You consent to jurisdiction in Delaware or Hawaii federal/state courts.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may terminate/suspend access anytime, without notice, for any reason (e.g., violations, inactivity). Upon termination, licenses cease; surviving sections (e.g., 4-13) remain. You may terminate by deleting your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Electronic Communications</h2>
              <p className="text-gray-300 leading-relaxed">
                Using the Platform constitutes consent to electronic notices (e.g., email, in-app). You agree such delivery satisfies legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Miscellaneous</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3 ml-4">
                <li><strong>Entire Agreement:</strong> These Terms, with referenced policies, form the complete agreement, superseding priors.</li>
                <li><strong>Severability:</strong> Invalid provisions are severed; remainder enforceable.</li>
                <li><strong>Waiver:</strong> No waiver implies future waivers.</li>
                <li><strong>Force Majeure:</strong> No liability for delays from uncontrollable events (e.g., disasters, pandemics, cyber-attacks).</li>
                <li><strong>Assignment:</strong> You may not assign; we may (e.g., in mergers).</li>
                <li><strong>International Use:</strong> Access from outside the U.S. is at your risk; comply with local laws (e.g., export controls).</li>
                <li><strong>Accessibility:</strong> We aim for accessibility; report issues.</li>
                <li><strong>Contact:</strong> Questions to legal@thriverhealth.ai or PO BOX 820, Honolulu, Hawaii 96808.</li>
              </ul>
            </section>

            <section className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <p className="text-white font-semibold">
                By using the Platform, you acknowledge reading, understanding, and agreeing to these Terms.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;

