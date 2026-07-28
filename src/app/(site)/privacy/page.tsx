import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { company } from "@/lib/content";

const EFFECTIVE_DATE = "July 10, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.legalName} collects, uses, and protects the information you share through this website.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: "/privacy",
    title: `Privacy Policy — ${company.legalName}`,
    description: `How ${company.legalName} handles the information you share through this website.`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <Section bg="ambient" className="pt-40 pb-14 sm:pb-16 md:pb-20">
        <Container className="max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-steel uppercase">
            Privacy Policy
          </span>
          <h1 className="text-display-3 font-semibold tracking-tight text-charcoal text-balance">
            Your privacy at {company.legalName}
          </h1>
          <p className="mt-6 text-lg text-steel">
            {company.legalName} designs, installs, and supports communication, network, and security
            systems for organizations across India. This policy explains what information we collect
            when you use this website, why we collect it, and how we handle it.
          </p>
          <p className="mt-4 text-sm text-steel">Effective date: {EFFECTIVE_DATE}</p>

          <div className="mt-12 flex flex-col gap-10">
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                1. Who we are
              </h2>
              <p className="mt-4 text-steel">
                This website is operated by {company.legalName} (&ldquo;IBS,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We are a systems integrator based in New Delhi,
                serving clients across India. If you have any questions about this policy or your data,
                you can reach us using the details in the{" "}
                <a href="#contact" className="underline underline-offset-2 hover:text-charcoal">
                  Contact us
                </a>{" "}
                section below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                2. Information we collect
              </h2>
              <p className="mt-4 text-steel">
                We only collect the information you choose to give us. We do not require you to create
                an account to browse this site.
              </p>
              <ul className="mt-4 flex flex-col gap-4">
                <li className="border-l-2 border-border pl-4">
                  <p className="font-medium text-charcoal">Enquiries submitted through our contact form</p>
                  <p className="mt-1 text-steel">
                    When you send us an enquiry, we collect your name and email address, and — where you
                    choose to provide them — your phone number, company name, the service you are
                    interested in, and the details of your message.
                  </p>
                </li>
                <li className="border-l-2 border-border pl-4">
                  <p className="font-medium text-charcoal">Job applications submitted through our careers page</p>
                  <p className="mt-1 text-steel">
                    When you apply for a role, we collect your name and email address, and — where
                    provided — your phone number, the role you are applying for, your experience,
                    location, a link to your resume, and any accompanying message.
                  </p>
                </li>
                <li className="border-l-2 border-border pl-4">
                  <p className="font-medium text-charcoal">Basic technical information</p>
                  <p className="mt-1 text-steel">
                    Like most websites, our hosting provider automatically logs standard technical data
                    (such as IP address and browser type) needed to serve pages securely and protect the
                    site against abuse.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                3. How we use your information
              </h2>
              <p className="mt-4 text-steel">We use the information you provide to:</p>
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-steel marker:text-deep-blue">
                <li>Respond to your enquiry and discuss your project requirements.</li>
                <li>Prepare quotes, proposals, and provide the services you ask about.</li>
                <li>Review and process job applications you submit to us.</li>
                <li>Maintain a record of our correspondence and keep the website secure.</li>
              </ul>
              <p className="mt-4 text-steel">
                We do not use your information for automated advertising profiling, and we do not sell
                your personal information to anyone.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                4. How your information is shared
              </h2>
              <p className="mt-4 text-steel">
                We share your information only with the service providers that help us operate this
                website and respond to you, and only to the extent needed to do so. These include:
              </p>
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-steel marker:text-deep-blue">
                <li>
                  Our website hosting and infrastructure provider, which serves the site and stores
                  submissions securely.
                </li>
                <li>
                  A messaging provider used to deliver contact-form enquiries to our team over
                  WhatsApp Business, so we can reply quickly.
                </li>
                <li>
                  An email delivery provider used to route job applications to our recruiting inbox.
                </li>
              </ul>
              <p className="mt-4 text-steel">
                We may also disclose information where required to do so by law. We do not otherwise
                share, rent, or sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                5. Data retention
              </h2>
              <p className="mt-4 text-steel">
                We keep enquiry and application records only for as long as needed to respond to you,
                fulfil the purpose they were collected for, and meet our legitimate business and legal
                requirements. When information is no longer needed, we remove it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                6. Data security
              </h2>
              <p className="mt-4 text-steel">
                We take reasonable technical and organizational measures to protect the information you
                submit against loss, misuse, and unauthorized access. Submissions are transmitted over
                secure connections. No method of transmission or storage is completely secure, but we
                work to safeguard your data at every step.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                7. Your choices and rights
              </h2>
              <p className="mt-4 text-steel">
                Sharing your information with us is voluntary. You can choose not to submit an enquiry
                or application. You may also ask us to access, correct, or delete the personal
                information you have shared with us — simply contact us using the details below and we
                will act on your request in line with applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                8. External links
              </h2>
              <p className="mt-4 text-steel">
                This website may link to third-party sites, including our social media pages. We are not
                responsible for the privacy practices of those sites, and we encourage you to review
                their policies before sharing any information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                9. Changes to this policy
              </h2>
              <p className="mt-4 text-steel">
                We may update this Privacy Policy from time to time to reflect changes in our practices
                or for legal reasons. When we do, we will revise the effective date shown at the top of
                this page.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28">
              <h2 className="text-xl font-semibold tracking-tight text-charcoal">
                10. Contact us
              </h2>
              <p className="mt-4 text-steel">
                If you have any questions about this Privacy Policy or how we handle your information,
                please get in touch:
              </p>
              <div className="mt-4 rounded-2xl border border-border bg-card p-6 text-sm">
                <p className="font-medium text-charcoal">{company.legalName}</p>
                <p className="mt-2 text-steel">{company.contact.address}</p>
                <p className="mt-2 text-steel">
                  Email:{" "}
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="underline underline-offset-2 hover:text-charcoal"
                  >
                    {company.contact.email}
                  </a>
                </p>
                <p className="mt-1 text-steel">
                  Phone:{" "}
                  {company.contact.phones.map((phone, index) => (
                    <span key={phone}>
                      {index > 0 && " / "}
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="underline underline-offset-2 hover:text-charcoal"
                      >
                        {phone}
                      </a>
                    </span>
                  ))}
                </p>
              </div>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
