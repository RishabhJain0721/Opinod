import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React from "react";

const PrivatePolicy = () => {
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Privacy Policy</h1>

        {/* Content */}
        <p className="mb-4">
          Thank you for visiting the website of www.opinod.com ('Site'). The
          Privacy Policy is applicable to the website of www.opinod.com and does
          not apply to the website of our partners, affiliates, agents or to any
          other third parties, even if their websites are linked to the Site. We
          recommend you review the privacy statements of the other parties with
          whom you interact. The following terms govern the collection, use and
          protection of your personal Information by the Site. This Privacy
          Policy shall be applicable to users who visit the Site. By visiting
          and/or using the Site, you have agreed to the following Privacy
          Policy.
        </p>

        {/* Section: Personal Information */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <p>
            Personal Information means and includes all information that can be
            linked to a specific individual or to identify any individual, such
            as photo, name, telephone number, e-mail address, and any and all
            details that may be requested while any user visits or uses the
            Site.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Password</li>
            <li>Financial information</li>
            <li>Physical, physiological and mental health condition</li>
            <li>Sexual orientation</li>
            <li>
              Any detail relating to the above clauses as provided to body
              corporate for providing service
            </li>
            <li>
              Any of the information received under above clauses by body
              corporate for processing, stored or processed under lawful
              contract or otherwise:
            </li>
          </ul>
          <p className="mt-4">
            Provided that any information that is freely available or accessible
            in public domain or furnished under the Right to Information Act,
            2005 or any other law for the time being in force shall not be
            regarded as sensitive personal data or information for the purposes
            of these rules.
          </p>
        </section>

        {/* Section: Registration */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Registration</h2>
          <p>
            If you choose to become a member of the Site, you may be required to
            provide your name, telephone number and e-mail address. Wherein if
            at any time you chose to accept to become a member of the website in
            addition to the information before stated you may also be required
            to provide a unique login name, password, and password validation.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Personal identification</li>
            <li>
              To customize the content of our site to strive to meet your
              specific needs;
            </li>
            <li>To make other improvements to our site.</li>
          </ul>
          <p className="mt-4">
            In addition, we need your e-mail address to confirm your new member
            registration. As a Site member you will also occasionally receive
            updates from us about the Site’s activities in your area, new Site
            services, and other noteworthy items. However, you may choose at any
            time to no longer receive these types of e-mail messages. Please see
            our Opt-Out Policy described below for details.
          </p>
        </section>

        {/* Section: Online Surveys */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Online Surveys</h2>
          <p>
            The Site values opinions and comments from users, so we may conduct
            online surveys. Participation in these surveys is entirely optional.
            Typically, the information is aggregated, and used to make
            improvements to the Site and its services and to develop appealing
            content, features and promotions for Site users. Survey participants
            are anonymous unless otherwise stated in the survey.
          </p>
        </section>

        {/* Section: Automatic Logging of Session Data */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Automatic Logging of Session Data
          </h2>
          <p>
            We may automatically log generic information about your computer's
            connection to the Internet, which we call 'session data', that is
            anonymous and not linked to any Personal Information. Session data
            consists of things such as IP address, operating system and type of
            browser software being used and the activities conducted by the user
            while on the Site.
          </p>
          <p className="mt-4">
            An IP address is a number that lets computers attached to the
            internet, such as our web servers, know where to send data back to
            the user, such as the pages of the Site the user wishes to view. We
            may collect session data to analyse, for example, what items
            visitors are likely to click on most, the way visitors are clicking
            through the Site, how many visitors are surfing to various pages on
            the Site, how long visitors to the Site are staying on it and how
            often they are visiting.
          </p>
          <p className="mt-4">
            It also helps us diagnose problems with our servers and lets us
            better administer our systems. Although such information does not
            identify any visitor personally, it is possible to determine from an
            IP address a visitor's Internet Service Provider (ISP), and the
            approximate geographic location of his or her point of connectivity.
          </p>
        </section>

        {/* Section: Cookies */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">'Cookies'</h2>
          <p>
            'Cookies' are small pieces of information stored by your browser on
            your computer's hard drive. You should know that cookies are only
            read by the server that placed them, and are unable to do such
            things as run programs on your computer, plant viruses or harvest
            your Personal Information.
          </p>
          <p className="mt-4">
            The use of cookies is very common on the Internet and the Site use
            of cookies is similar to that of such sites as any other reputable
            online portal. First and foremost, you can rest assured that no
            personally identifiable information ('PII') about you (e.g., name,
            address, etc.) is gathered or stored in the cookies placed by the
            Site and, as a result, none can be passed on to any third parties.
          </p>
          <p className="mt-4">
            Cookies allow us to serve you better and more efficiently, and to
            personalize your experience on our Site. The Site may use cookies to
            personalize your experience on the Site as these cookies allow you
            to log in without having to type your log-in name every time (only
            your password is needed).
          </p>
          <p className="mt-4">
            None of this information is passed to any third party, and is used
            solely by us to provide you with a better user experience on the
            Site. A cookie may also be placed by our advertising server. Such
            cookies are used only for purposes of tracking the effectiveness of
            advertising served by us on our Site and no PII is gathered from you
            by the use of these cookies, nor is this information shared with any
            third parties.
          </p>
          <p className="mt-4">
            Similarly, a cookie may be placed by our third-party advertising
            companies or advertisement providers or servers. These companies may
            use aggregated statistics about your visits to this and other
            websites in order to provide information and updates about the
            happenings on the Site that you may be interested in or any subject
            of potential interest to you.
          </p>
          <p className="mt-4">
            The information they collect does not include your PII. The
            third-party advertising companies or advertisement providers may
            also employ technology that is used to measure the effectiveness of
            ads. Any such information is anonymous. They may use this anonymous
            information about your visits to this and other sites in order to
            provide information and updates about the happenings on the Site
            that may interest you.
          </p>
          <p className="mt-4">
            No PII is collected during this process. The information is
            anonymous, and does not link online actions to an identifiable
            person. Most web browsers automatically accept cookies. Of course,
            by changing the options on your web browser or using certain
            software programs, you can control how and whether cookies will be
            accepted by your browser.
          </p>
          <p className="mt-4">
            The Site supports your right to block any unwanted Internet
            activity, especially that of unscrupulous websites. However,
            blocking the Site cookies may disable certain features on the Site,
            and may make it impossible to use certain services available on the
            Site. Please note that it is possible to block cookie activity from
            certain websites while permitting cookies from websites you trust,
            like www.iamcourage.com Site.
          </p>
        </section>

        {/* Section: Other */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Other</h2>
          <p>
            From time to time we may add or enhance services available on the
            Site. To the extent these services are provided, and used by you, we
            will use the information you provide to facilitate the service
            requested. For example, if you email us with a question, we will use
            your email address, name, nature of the question, etc. to respond to
            your question.
          </p>
          <p className="mt-4">
            We may also store such information to assist us in making the Site
            the better and easier to use.
          </p>
        </section>

        {/* Section: Sharing Personal Information */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            With whom we may share your Personal Information?
          </h2>
          <p>
            For making the use of Site effective and resourceful the Site may
            share your information with vendors, consultants, and other service
            providers or volunteers who are engaged by or working with us and
            who need access to such information to carry out their work for us;
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>
              To report required information to any statutory body at any time
              as may be required;
            </li>
            <li>
              When we believe in good faith that we are required to do so by
              law, court order, as requested by other government or law
              enforcement authority, or in the good faith belief that disclosure
              is otherwise necessary or advisable including, without limitation,
              to protect the rights or properties of the Site or any or all of
              its affiliates, associates, employees, agents or office bearers or
              when we have reason to believe that disclosing the information is
              necessary to identify, contact or bring legal action against
              someone who may be causing interference with our rights or
              properties, whether intentionally or otherwise, or when anyone
              else could be harmed by such activities.
            </li>
            <li>
              To enforce or apply this Policy, our Terms of Usage, or our other
              policies or agreements.
            </li>
          </ul>
        </section>

        {/* Section: Opting Out */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            How can you opt out of from our website and informational updates?
          </h2>
          <p>
            You may "opt out" of receiving text messages, email updates and
            newsletters by following the instructions in those text messages and
            emails. Please note that we may still send you other types of
            emails, such as emails about your use of our Sites, or use
            information as otherwise described in this Policy, even if you opt
            out of receiving email updates and newsletters.
          </p>
          <p className="mt-4">
            Changes to information in your account does not affect information
            provided to others as set forth in this policy.
          </p>
        </section>

        {/* Section: Safeguards */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            What safeguards we have in place to protect your Personal
            Information?
          </h2>
          <p>
            We take reasonable measures to protect your personal information in
            an effort to prevent loss, misuse, and unauthorized access,
            disclosure, alteration, and destruction. Please be aware, however,
            that despite our efforts, no security measures are perfect or
            impenetrable and no method of data transmission that can be
            guaranteed against any interception or other type of misuse. To
            protect the confidentiality of personal information, you must keep
            your password confidential and not disclose it to any other person.
            You are responsible for all uses of our web sites by any person
            using your password. Please advise us immediately if you believe
            your password has been misused. Please send a data deletion request
            to contact@opinod.com to initiate the deletion process.
          </p>
        </section>

        {/* Section: third party links  */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Does this policy apply to third party links on Site?
          </h2>
          <p>
            Our website may contain links to other websites. Any personal
            information you provide on the linked pages is provided directly to
            that third party and is subject to that third party's privacy
            policy. This Policy does not apply to such linked sites, and we are
            not responsible for the content or privacy and security practices
            and policies of these websites or any other sites that are linked to
            from our Sites. We encourage you to learn about their privacy and
            security practices and policies before providing them with personal
            information. This policy is effective as of 24 October 2024 Any
            material changes in the way the Site uses Personal Information will
            be described in future versions of this Privacy Statement. Of
            course, you may always submit concerns regarding our Privacy
            Statement or our privacy practices via email to contact@opinod.com.
            Please refer the privacy policy in your subject line. The Site will
            attempt to respond to all reasonable concerns or inquiries at the
            earliest. These terms and conditions are subject to the laws of
            India and in particular the Information Technology Act 2000 and the
            Rules framed therein from time to time. Any part of this policy
            which may be in contravention of or inconsistent with the Act, Rules
            as mentioned above or any other applicable law will be deemed as
            invalid and void and shall be deemed as severed from this policy.
            Also all relevant and appropriate terms and provisions of such Act
            and Rules and any other applicable law shall be deemed to have been
            incorporated herein for the purposes of this policy and use by you
            of the Site.
          </p>
        </section>
        <p className="mt-8 text-center text-gray-600">
          All disputes are subject to the exclusive jurisdiction of the courts
          in New Delhi.
        </p>
        <p className="mt-3 text-center text-gray-600">
          Thank you for using the Site .
        </p>
      </div>
    </div>
  );
};

export default PrivatePolicy;
