import Link from "next/link";
import Image from "next/image";
import { ACTIVE_YEAR } from "@/lib/config";
import { images } from "@/constants/2027/cloudinary_images";
import { navItems } from "@/constants/2027/navItems";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  // Extract child categories for grouping
  const infoSection = navItems.find((item) => item.label === "Information");
  const cfpSection = navItems.find((item) => item.label === "Call for Papers");
  const regSection = navItems.find((item) => item.label === "Registration");
  const venueSection = navItems.find((item) => item.label === "Venue & Travel");

  return (
    <footer id="contact" className="mt-auto border-t-4 border-ink bg-border/50">
      {/* Top Header Section */}
      <div className="relative px-6 py-12 text-center border-b border-ink/30 bg-paper/50 overflow-hidden">
        {/* Background Image Layer with low opacity and responsive sizing */}
        <div
          className="absolute inset-0 z-0 opacity-35 pointer-events-none bg-repeat-x bg-bottom bg-contain"
          style={{
            backgroundImage: `url(${images.footer})`,
          }}
        />
        <div className="relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
            Department of Computer Science and Engineering
          </h2>
          <h3 className="mt-2 font-sans text-sm md:text-base font-bold uppercase tracking-widest text-grove-600">
            Heritage Institute Of Technology, Kolkata
          </h3>
          <p className="mt-3 font-mono text-xs md:text-sm text-ink-dim max-w-3xl mx-auto border border-dashed border-border py-2 px-4 bg-paper/80 shadow-[2px_2px_0px_0px_var(--color-ink)]">
            [An Autonomous Institute affiliated to MAKAUT || Accredited with
            &ldquo;A&rdquo; grade by NAAC]
          </p>
        </div>
      </div>

      {/* Middle Grid Section */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and About Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://www.heritageit.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <Image
                  src={images.heritage}
                  alt="Heritage logo"
                  width={60}
                  height={60}
                  className="w-13 h-13 lg:w-15 lg:h-15 object-cover"
                />
              </a>

              <a href="/2027" className="hover:opacity-90 transition-opacity">
                <Image
                  src={images.icaa}
                  alt="ICAA logo"
                  width={120}
                  height={60}
                  className="w-28 h-13 lg:w-32 lg:h-18 object-contain"
                />
              </a>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-ink leading-snug">
                Heritage Institute of Technology,
              </p>
              <p className="font-sans text-sm text-ink-dim mt-1">Kolkata</p>
            </div>
            {/* Social Icons with Neo-Brutalist Buttons */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/Heritageit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border-2 border-ink flex items-center justify-center bg-paper text-ink hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--color-ink)] transition-all duration-150"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/school/heritage-institute-of-technology"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 border-2 border-ink flex items-center justify-center bg-paper text-ink hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--color-ink)] transition-all duration-150"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/heritageitkol"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 border-2 border-ink flex items-center justify-center bg-paper text-ink hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--color-ink)] transition-all duration-150"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@TheHeritageGroupofInstitutions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 border-2 border-ink flex items-center justify-center bg-paper text-ink hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--color-ink)] transition-all duration-150"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Information */}
          <div>
            <h4 className="font-serif text-lg font-bold text-ink mb-4 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-grove-600 pb-1">
              Information
            </h4>
            {infoSection?.children && (
              <ul className="flex flex-col gap-2">
                {infoSection.children.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.href}
                      className="text-sm font-medium text-ink-dim hover:text-grove-600 hover:translate-x-1 transition-all duration-200 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-grove-600 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 3: Call for Papers */}
          <div>
            <h4 className="font-serif text-lg font-bold text-ink mb-4 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-grove-600 pb-1">
              Call for Papers
            </h4>
            {cfpSection?.children && (
              <ul className="flex flex-col gap-2">
                {cfpSection.children.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.href}
                      className="text-sm font-medium text-ink-dim hover:text-grove-600 hover:translate-x-1 transition-all duration-200 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-grove-600 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 4: Registration */}
          <div>
            <h4 className="font-serif text-lg font-bold text-ink mb-4 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-grove-600 pb-1">
              Registration
            </h4>
            {regSection?.children && (
              <ul className="flex flex-col gap-2">
                {regSection.children.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.href}
                      className="text-sm font-medium text-ink-dim hover:text-grove-600 hover:translate-x-1 transition-all duration-200 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-grove-600 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 5: Venue & Travel */}
          <div>
            <h4 className="font-serif text-lg font-bold text-ink mb-4 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-grove-600 pb-1">
              Venue & Travel
            </h4>
            {venueSection?.children && (
              <ul className="flex flex-col gap-2">
                {venueSection.children.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.href}
                      className="text-sm font-medium text-ink-dim hover:text-grove-600 hover:translate-x-1 transition-all duration-200 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-grove-600 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Horizontal Contact Card Below (mobile-friendly cards) */}
        <div className="mt-12 pt-8 border-t border-border/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-paper/80 rounded-md border border-border/60 hover:bg-paper hover:shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="flex items-center justify-center size-8 lg:size-10 rounded-full bg-grove-600 text-paper shrink-0 group-hover:scale-110 transition-transform duration-200">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs uppercase tracking-wider text-ink">
                  Email Us
                </h5>
                <a
                  href="mailto:icaa@heritageit.edu"
                  className="text-xs lg:text-sm font-medium text-ink-dim hover:text-grove-600 hover:font-bold wrap-break-word inline-block transition-all duration-200"
                >
                  icaa@heritageit.edu
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-paper/80 rounded-md border border-border/60 hover:bg-paper hover:shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="flex items-center justify-center size-8 lg:size-10 rounded-full bg-grove-600 text-paper shrink-0 group-hover:scale-110 transition-transform duration-200">
                <FaPhone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs uppercase tracking-wider text-ink">
                  Call Us
                </h5>
                <a
                  href="tel:+913366270502"
                  className="text-xs lg:text-sm font-medium text-ink-dim hover:text-grove-600 hover:font-bold inline-block transition-all duration-200"
                >
                  +91 33 6627 0502
                </a>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/The+Heritage+College,+Kolkata/@22.5184079,88.4143146,17z/data=!4m6!3m5!1s0x3a0273f58b9feec5:0x30f8067b73c45d8!8m2!3d22.5184079!4d88.4168895!16zL20vMGJnZjRx?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-paper/80 rounded-md border border-border/60 hover:bg-paper hover:shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-center size-8 lg:size-10 rounded-full bg-grove-600 text-paper shrink-0 group-hover:scale-110 transition-transform duration-200">
                <FaLocationDot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs uppercase tracking-wider text-ink">
                  Location
                </h5>
                <address className="not-italic text-xs lg:text-sm font-medium text-ink-dim leading-snug group-hover:text-grove-600 transition-colors duration-200">
                  Chowbaga Rd, Anandapur, Mundapara
                  <br />
                  Kolkata, West Bengal 700107
                </address>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-ink text-paper py-4 px-6 border-t-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono tracking-wider">
          <p>Copyright &copy; {ACTIVE_YEAR} Heritage Institute of Technology</p>
          <p className="text-ink-ghost">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
