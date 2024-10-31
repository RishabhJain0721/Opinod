import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-5 text-xs md:text-base">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 overflow-y-auto">
        <div
          className="cursor-pointer mb-3 md:mb-5 md:my-5"
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Home
        </div>
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Terms and Conditions
        </h1>

        {/* Introduction */}
        <p className="mb-4">
          Opinod team welcomes you to our digital knowledge site. Below are our
          terms and conditions for use of the site, which you may access in
          several ways, including the World Wide Web, mobile phone, digital
          television, etc. These terms and conditions apply whenever you access
          the site, on whatever devices.
        </p>
        <p className="mb-4">
          By using the site as a reader or registered user, you are deemed to
          have accepted these terms and conditions. If you are registered as a
          user, please read carefully the privacy policy.
        </p>
        <p className="mb-4">
          Any changes we make to the terms and conditions will be reflected on
          this page.
        </p>

        {/* Terms */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Terms</h2>
          <ol className="list-decimal list-inside">
            <li className="mb-4">
              <span className="font-medium">1)</span> By using opinod.com you
              agree to be legally bound by these terms, which shall take effect
              immediately on your first use of opinod.com. If you do not agree
              to be legally bound by all the following terms please do not
              access and/or use opinod.com.
            </li>
            <li className="mb-4">
              <span className="font-medium">2)</span> Team may change these
              terms at any time by posting changes online. Please review these
              terms regularly to ensure you are aware of any changes made. Your
              continued use of opinod.com after changes to this policy are
              posted means you agree to be legally bound by these terms as
              updated and/or amended.
            </li>
            <li className="mb-4">
              <span className="font-medium">3)</span> You may not copy,
              reproduce, republish, download, post, broadcast, transmit, make
              available to the public, or otherwise use opinod.com content in
              any way except for your own personal, non-commercial use. You also
              agree not to adapt, alter or create a derivative work from any
              opinod.com content except for your own personal, non-commercial
              use. Any other use of opinod.com content requires the prior
              written permission.
            </li>
            <li className="mb-4">
              <span className="font-medium">4)</span> The website opinod.com and
              the contents thereof (including but not limited to text,
              photographs, images, illustrations, designs, audio clips, video
              clips "look and feel", metadata, data or compilation) are
              protected by copyright and are intended strictly for personal and
              non-commercial use only. In this regard, non-commercial use shall
              not include the use of the website opinod.com and the contents
              thereof without prior written consent in connection with (a) the
              development of any software program, including but not limited to,
              training a machine learning or artificial intelligence (AI)
              systems or (b) providing archived or cached data sets containing
              the content(s) to other personal or entity.
            </li>
            <li className="mb-4">
              <span className="font-medium">5)</span> You agree to use
              opinod.com only for lawful purposes, and in a way that does not
              infringe the rights of, restrict or inhibit anyone else's use and
              enjoyment of opinod.com. Prohibited behaviour includes harassing
              or causing distress or inconvenience to any person, transmitting
              obscene or offensive content or disrupting the normal flow of
              dialogue within opinod.com.
            </li>
          </ol>
        </section>

        {/* Disclaimer of Liability */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Disclaimer of Liability
          </h2>
          <p>
            We does not accept any responsibility for any statement in the
            material. You must not rely on any statement we have published on
            opinod.com without first taking specialist professional advice.
            Nothing in the material is provided for any specific purpose or at
            the request of any particular person.
          </p>
          <p className="mt-4">
            We give no warranties of any kind and without any representations
            for material—information, names, images, pictures, logos and
            icons—found in opinod.com.
          </p>
          <p className="mt-4">
            You can access other sites via links from opinod.com. These sites
            are not under our control and we are not responsible in any way for
            any of their contents.
          </p>
          <p className="mt-4">
            We are not liable for any of the following losses or damages
            (whether such losses were foreseen, foreseeable, known or
            otherwise):
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>(a) loss of data;</li>
            <li>(b) loss of revenue or anticipated profits;</li>
            <li>(c) loss of business;</li>
            <li>(d) loss of opportunity;</li>
            <li>(e) loss of goodwill or injury to reputation;</li>
            <li>(f) losses suffered by third parties; or</li>
            <li>
              (g) any indirect, consequential, special or exemplary damages
              arising from the use of opinod.com regardless of the form of
              action.
            </li>
          </ul>
          <p className="mt-4">
            You must take your own precaution in this respect, as we accept no
            responsibility for any infection by virus, by other contamination or
            by anything that has destructive properties.
          </p>
        </section>

        {/* If You're Under 18 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">If You're Under 18</h2>
          <ol className="list-decimal list-inside">
            <li className="mb-4">
              i) Please get permission from a parent or guardian before taking
              part in any opinod.com discussion.
            </li>
            <li className="mb-4">
              ii) Never reveal any personal information about yourself or anyone
              else (for example, telephone number, home address or email
              address).
            </li>
          </ol>
        </section>

        {/* Third Party Material On opinod.com */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Third Party Material On opinod.com
          </h2>
          <p>
            You will see advertising material submitted by third parties on
            opinod.com. Advertisers are solely responsible for the content of
            advertising material, which they submit to us, including ensuring
            that it complies with relevant legislation. We accept no
            responsibility for the content of advertising material, including,
            without limitation, any error, omission or inaccuracy therein
          </p>
        </section>

        {/* Text Submission to opinod.com */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Text Submission to opinod.com
          </h2>
          <p>
            Users of our site may submit material for publication in various
            areas of the site, including our blog service. We accept no
            liability with respect to any material submitted by users and
            published by us and we are not responsible for its content and
            accuracy.
          </p>
          <p className="mt-4">
            If you want to submit material to us for publication on opinod.com,
            you may do so on the following terms and conditions:
          </p>
          <ol className="list-decimal list-inside mt-4">
            <li>
              Publication of any material you submit to us will be at your sole
              discretion. We reserve the right to make additions or deletions to
              the text or graphics prior to publication, or to refuse
              publication;
            </li>
            <li>
              You grant us a non-exclusive, perpetual, royalty-free, worldwide
              licence to republish any material you submit to us in any format,
              including, without limitation, print and electronic format;
            </li>
            <li>
              You declare to us that any material you submit to us is your own
              original work and that you own the copyright and any other
              relevant rights;
            </li>
            <li>
              You warrant that the material you submit is not obscene,
              offensive, defamatory of any person or otherwise illegal;
            </li>
            <li>
              You agree not to post material including spamming which is
              deliberately intended to upset other users;
            </li>
            <li>
              You acknowledge that any breach of these warranties may cause us
              damage or loss and you agree to indemnify us in full and
              permanently against any third party liabilities, claims, costs,
              loss or damage we incur as a result of publishing material you
              submit to us, including consequential losses;
            </li>
            <li>
              We reserve the right to remove your access to individual services
              if we believe you are abusing the services in any way.
            </li>
          </ol>
        </section>

        {/* Graphic Material Submission */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Graphic Material Submission
          </h2>
          <p>
            When you send a photograph or other graphical material to us you do
            so in accordance with these Terms of Use. This means that you hereby
            agree that you have taken the photograph(s) you have sent to us or
            you have permission from or are authorised by the owner of the
            photograph(s) to send it (them) to us, and you are granting us a
            non-exclusive, royalty-free licence to publish or otherwise use the
            photograph(s) in any way and at any time we want on opinod.com.
          </p>
          <p className="mt-4">
            The photograph(s) must not be defamatory and may not break any laws.
          </p>
          <p className="mt-4">
            Selected photographs and graphical material will be published at the
            discretion of the editor and you will not be paid, even if your
            photograph(s) is (are) published.
          </p>
          <p className="mt-4">
            We may cut, edit, crop or arrange your photograph(s) or graphic as
            we think fit to appear on opinod.com, and we may remove your
            photograph(s) or graphics at any time.
          </p>
          <p className="mt-4">
            Your name will be published alongside your photograph(s) or graphic,
            but we may edit or delete any comments, which you submit along with
            your photograph(s) or graphic.
          </p>
        </section>

        {/* Safety */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Safety</h2>
          <p>
            We advise that you never reveal any personal information about
            yourself or anyone else (for example: telephone number, home address
            or email address). Please do not include postal addresses of any
            kind. If you have a helpful address to share, inform the host of the
            relevant community area using the 'Contact Us' link, and they will
            promote it if they see fit.
          </p>
        </section>

        {/* General */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">General</h2>
          <p>
            These terms may vary from time to time. Please ensure that you
            review these terms and conditions regularly as you will be deemed to
            have accepted any variation if you continue to use the site after it
            has been posted.
          </p>
          <p className="mt-4">
            Although we will do our best to provide constant, uninterrupted
            access to opinod.com, we do not guarantee this. We accept no
            responsibility or liability for any interruption or delay.
          </p>
        </section>

        {/* Governing Law & Jurisdiction */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Governing Law & Jurisdiction
          </h2>
          <p>
            These terms shall be governed by and interpreted in accordance with
            the laws of India and especially the Information Technology Act,
            2000. All relevant rules, regulations, directions, orders and
            notifications will also apply. By choosing to browse this site, you
            agree to the site's Privacy Policy
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
