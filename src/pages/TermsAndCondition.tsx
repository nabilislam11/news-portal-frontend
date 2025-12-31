import Container from "../components/container/Container";

const TermsAndCondition = () => {
  return (
    <div className="bg-white py-10 md:py-16 min-h-screen">
      <Container>
        <div className="max-w-5xl mx-auto px-4 py-20">
          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-100 pb-4 mb-8">
            Terms of Use
          </h1>

          <div className="space-y-8 text-gray-800 leading-relaxed text-[15px] md:text-[16px]">
            {/* Section 1 */}
            <section>
              <p>
                We welcome and invite to our{" "}
                <strong>'Terms of Use' of প্রতিদিন জনতার নিউজ</strong> and its
                associated websites, its contents, services and applications.
                Individuals may access the content in several ways using
                multiple channels including but not limited to www, digital,
                social platforms, SMS and RSS feeds using multiple devices
                including but not limited to computers, mobile phones and PDAs.
                By using our content and services, that is, by reading or using
                any content, picture or information whatsoever, the users accept
                our "Terms of Use" including প্রতিদিন জনতার নিউজ's Privacy
                Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg font-bold text-black mb-3">
                Intellectual Property Rights
              </h2>
              <p>
                প্রতিদিন জনতার নিউজ's content, logos, copyright, trademarks,
                patents, images, text, graphics, logos, domain names, audio,
                video and other related intellectual property rights or other
                features of প্রতিদিন জনতার নিউজ brand and name belong to
                প্রতিদিন জনতার নিউজ or to its licensors. Users cannot claim any
                rights in and/or our licensor's intellectual property whether
                for commercial or non-commercial use.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg font-bold text-black mb-3">
                Your use of our services
              </h2>
              <p>
                Site readers/visitors are required to use প্রতিদিন জনতার নিউজ
                services only for lawful means and for read-only purposes. The
                audio and visual elements of the website or application can only
                be listened to and viewed and nothing beyond. প্রতিদিন জনতার
                নিউজ encourages its readers to share its content(s) in their
                social media profile, groups and related communities.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg font-bold text-black mb-3">
                Unauthorized and prohibited activities
              </h2>
              <p>
                The user is specifically required not to associate প্রতিদিন
                জনতার নিউজ with any political party, racism, sexism or otherwise
                damage its reputation. The user is also prohibited from
                submitting প্রতিদিন জনতার নিউজ to damaging any other person or
                entity by commenting on any post / content that may amount to
                harassment of others.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg font-bold text-black mb-3">
                Protection of Users Device
              </h2>
              <p>
                Readers/Visitors are required to take their own precautions and
                protections in this respect as প্রতিদিন জনতার নিউজ does not
                accept any responsibility for any attacks by virus or malware or
                any other contamination or by anything which has destructive
                properties.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg font-bold text-black mb-3">
                Privacy Policy
              </h2>
              <p>
                The entire Privacy Policy of প্রতিদিন জনতার নিউজ is an integral
                part of the "Terms of Use". All clauses in the Privacy Policy
                are hereby incorporated by reference, except for the clauses
                which are similar or have the same meaning.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-lg font-bold text-black mb-3">
                Modification of Terms of Use
              </h2>
              <p>
                প্রতিদিন জনতার নিউজ reserves the right to amend, modify, alter,
                or omit any terms in the "Terms of Use" at any time but the
                changed policy shall be immediately uploaded or updated in the
                website. By continuing to use our services after any changes are
                made, you accept those changes and will be bound by them.
              </p>
            </section>

            {/* Governing Law Section */}
            <section className="bg-gray-50 p-6 border-l-4 border-red-500 rounded">
              <h2 className="text-lg font-bold text-black mb-3">
                Governing Law
              </h2>
              <p>
                The laws that govern "Terms of Use" of প্রতিদিন জনতার নিউজ and
                its relationship with the user is the laws of Bangladesh and any
                dispute regarding the use, retention, disclosure, leakage or
                dissemination of the information or date can only be raised in
                court in Bangladesh which shall have exclusive jurisdiction on
                this matter.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndCondition;
