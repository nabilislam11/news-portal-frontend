import Container from "../components/container/Container";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white py-12 md:py-20 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto px-4 py-18">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
            <p>
              Your privacy is important to us. It is প্রতিদিন জনতার নিউজ's
              policy to respect your privacy regarding any information we may
              collect from you across our website, and other sites we own and
              operate.
            </p>

            <section>
              <h2 className="text-xl font-bold text-black mb-3 underline decoration-red-500 decoration-2 underline-offset-4">
                Information we collect
              </h2>
              <p className="mb-2">
                প্রতিদিন জনতার নিউজ collects information on a user upon the
                user's access to the website:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>By registering to the site or Apps.</li>
                <li>Subscribing to the newsletter.</li>
                <li>
                  Responding to a survey or participating in a competition.
                </li>
                <li>Logging in to a site or page, etc.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">
                How do we protect your information?
              </h2>
              <p>
                We do not use vulnerability scanning and/or scanning to PCI
                standards. We only provide articles and information. We never
                ask for credit card numbers. We use regular Malware Scanning.
                Your personal information is contained behind secured networks
                and is only accessible by a limited number of persons who have
                special access rights to such systems.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">
                Do we use 'cookies'?
              </h2>
              <p>
                প্রতিদিন জনতার নিউজ does not collect any user data based on
                cookies, nor does it store any sort of user information that may
                be personal to the user. If a third party associated with the
                প্রতিদিন জনতার নিউজ website collects user cookies upon your
                visit to the প্রতিদিন জনতার নিউজ website, প্রতিদিন জনতার নিউজ
                does not control the use of these cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">
                Google Analytics
              </h2>
              <p>
                প্রতিদিন জনতার নিউজ uses Google Analytics to track and report
                website traffic. Google uses the data collected to track and
                monitor the use of our Service. This data is shared with other
                Google services.
              </p>
            </section>

            <section className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h2 className="text-xl font-bold text-red-700 mb-3">
                Contact us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us via Email:
                <span className="font-bold ml-1 text-red-600">
                  info@protidinjonotarnews.com
                </span>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
