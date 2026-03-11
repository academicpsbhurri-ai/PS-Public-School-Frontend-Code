/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logedin, setlogedin] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("adminToken");
    if (user) {
      setlogedin(true);
    }
  }, []);

  const menuItems = [
    {
      title: "About Us",
      links: [
        { name: "About School", href: "/about" },
        { name: "Staff & Faculty", href: "/staff-and-faculty" },
        { name: "Mandatory Disclosure", href: "/mandatory-public-disclosure" },
      ],
    },
    {
      title: "Academics",
      links: [
        { name: "Academics Overview", href: "/academic" },
        { name: "Facilities", href: "/facilities" },
        { name: "Student Life", href: "/student-life" },
      ],
    },
    {
      title: "Student",
      links: [
        { name: "Students Result", href: "/results" },
        { name: "Datesheet", href: "/datesheet" },
        { name: "Online Fee Payment", href: "/payment" },
        { name: "CBSE Result", href: "https://results.cbse.nic.in/" },
      ],
    },
    {
      title: "Admissions",
      links: [
        { name: "Admissions Info", href: "/addimissioninfo" },
        { name: "Apply Online", href: "/applyform" },
      ],
    },

    /* 🔐 LOGIN MENU (FIXED) */
    {
      title: "Login",
      links: logedin
        ? [
            { name: "Admin Panel", href: "/admin-login/adminhome" },
            { name: "Logout", href: "/logout" },
          ]
        : [
            { name: "Admin Login", href: "/admin-login" },
{
  name: "Portal Login",
  href: "https://erp.pspublicschool.com/",
  external: true,
},
          ],
    },
  ];

  const toggleDropdown = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <nav className="bg-[#1E3A8A] text-white sticky top-0 z-50 border-b-[0.1px] border-[#FBBF24]">
      <div className="container mx-auto px-4">

        {/* TOP BAR */}
        <div className="flex justify-between items-center py-5">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/LOGON.png"
              alt="PS Public School Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold tracking-wide">
              P. S. PUBLIC SCHOOL
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            {menuItems.map((menu) => (
              <li key={menu.title} className="relative">
                <button
                  onClick={() => toggleDropdown(menu.title)}
                  className="flex items-center hover:text-[#FBBF24] transition"
                >
                  {menu.title}
                  <FaChevronDown
                    className={`ml-1 text-sm transition-transform ${
                      openMenu === menu.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu === menu.title && (
                  <ul className="absolute left-0 mt-3 min-w-[220px] bg-white text-[#111827] rounded-lg shadow-lg py-2 z-50">
                    {menu.links.map((link) => (
  <li key={link.name}>
    {link.external ? (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-5 py-2 hover:bg-[#FBBF24] transition"
        onClick={() => setOpenMenu(null)}
      >
        {link.name}
      </a>
    ) : (
      <Link
        href={link.href}
        className="block px-5 py-2 hover:bg-[#FBBF24] transition"
        onClick={() => setOpenMenu(null)}
      >
        {link.name}
      </Link>
    )}
  </li>
))}

                  </ul>
                )}
              </li>
            ))}

            {/* CONTACT */}
            <li>
              <Link
                href="/contact"
                className="bg-[#FBBF24] text-[#111827] px-5 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* MOBILE ICON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-[#1E3A8A] text-white p-4 space-y-4">
            {menuItems.map((menu) => (
              <div key={menu.title}>
                <button
                  onClick={() => toggleDropdown(menu.title)}
                  className="flex items-center justify-between w-full font-medium text-lg py-2"
                >
                  {menu.title}
                  <FaChevronDown
                    className={`ml-1 text-sm transition-transform ${
                      openMenu === menu.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu === menu.title && (
                  <ul className="bg-white text-[#111827] rounded-lg shadow-lg py-2 mt-2">
                    {menu.links.map((link) => (
                      <li key={link.name}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-5 py-2 hover:bg-[#FBBF24] transition"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="block px-5 py-2 hover:bg-[#FBBF24] transition"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Link
              href="/contact"
              className="block bg-[#FBBF24] text-[#111827] px-5 py-2 rounded-md font-semibold hover:bg-yellow-500 transition text-center"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
