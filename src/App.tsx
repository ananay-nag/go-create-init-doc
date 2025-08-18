import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CheckCircleIcon,
  TerminalIcon,
  CogIcon,
  
} from "@heroicons/react/outline"; // or any icon lib you add
import { Github } from "lucide-react"
const navItems = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "examples", label: "Examples" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-300 shadow-sm">
    <nav className="flex max-w-6xl mx-auto px-6 py-4 items-center justify-between flex-wrap">
      <div className="text-3xl font-bold text-purple-700 select-none cursor-default">
        Go Set Mod 🚀
      </div>
      <div className="hidden md:flex space-x-4">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="font-medium px-3 py-2 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-900 transition"
          >
            {label}
          </button>
        ))}
        <Github color="blue" size={36}  className="cursor-pointer" onClick={()=>{window.open("https://github.com/ananay-nag/go-create-init-module", "_blank");}}/>;
      </div>
    </nav>
  </header>
);

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [copied, setCopied] = React.useState(false);
  const copyHandler = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copyHandler}
      aria-label="Copy code to clipboard"
      className={`absolute top-2 right-2 z-10 rounded bg-purple-600 px-3 py-1 text-xs font-semibold text-white hover:bg-purple-700 transition ${
        copied ? "bg-green-500 hover:bg-green-600" : ""
      }`}
      type="button"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const CodeBlock: React.FC<{ language: string; children: string }> = ({
  language,
  children,
}) => {
  const code = children.trim();
  return (
    <div className="relative mb-6 max-w-full overflow-x-auto rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 shadow-sm">
      <CopyButton textToCopy={code} />
      <SyntaxHighlighter
        language={language}
        style={materialLight}
        customStyle={{
          backgroundColor: "transparent",
          margin: 0,
          padding: 0,
          fontSize: "0.9rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
const installCommand = `curl -fsSL https://raw.githubusercontent.com/ananay-nag/go-create-init-module/refs/heads/main/install.sh | bash`;

const InstallModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-lg max-w-6xl w-full p-6 relative shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <h3 className="text-xl font-semibold text-purple-800 mb-4 select-none">
          Installation Command
        </h3>
        <CodeBlock language="bash">{installCommand}</CodeBlock>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-purple-600 hover:text-purple-800 font-bold text-2xl cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>
      </motion.div>
    </div>
  );
};

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section
      id="home"
      className="max-w-5xl mx-auto px-6 pt-12 pb-20 scroll-smooth"
    >
      {/* Animated Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          className="mb-6 select-none text-8xl inline-block"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          role="img"
          aria-label="rocket emoji"
        >
          🚀
        </motion.div>

        <h1 className="text-7xl font-extrabold text-purple-900 mb-6 drop-shadow-lg select-none">
          go-set-mod
        </h1>

        <motion.p
          className="max-w-xl mx-auto text-2xl text-purple-800 mb-10 font-semibold leading-relaxed drop-shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="italic text-pink-600">Effortlessly automate</span>{" "}
          your Go module initialization
          <br />
          <span className="font-black">with precision and ease.</span>
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(128,90,213,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="m-1 rounded-full bg-purple-700 px-12 py-4 text-white font-extrabold shadow-lg hover:bg-purple-800 transition focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          Install Now
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(128,90,213,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>{window.open("https://github.com/ananay-nag/go-create-init-module", "_blank");}}
          className="m-1 rounded-full bg-purple-700 px-12 py-4 text-white font-extrabold shadow-lg hover:bg-purple-800 transition focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          ⭐ Give Star
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-14 text-purple-900 font-extrabold text-xl tracking-widest text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Simplify · Automate · Accelerate
        </span>
      </motion.div>

      {/* Introduction, Installation, Use Cases, License, Contribution */}
      <article className="mt-24 mx-auto px-6 py-10 bg-white rounded-lg shadow-lg border border-purple-200 prose prose-purple max-w-none">
        <h2 className="text-4xl font-extrabold mb-8 border-b-4 border-purple-300 pb-3 select-none">
          Introduction
        </h2>
        <p className="text-lg text-gray-800 mb-4">
          <strong className="text-purple-700 font-semibold">go-set-mod</strong>{" "}
          simplifies Go project setup by automating the initialization of Go
          modules with{" "}
          <span className="font-bold text-pink-600">correct naming</span>{" "}
          according to your directory structure and GitHub namespace.
        </p>
        <p className="text-gray-700 leading-relaxed">
          It automatically detects your project root and{" "}
          <span className="font-semibold text-pink-600">
            removes manual errors
          </span>{" "}
          in module names.
        </p>

        <h2 className="text-4xl font-extrabold mt-16 mb-6 border-b-4 border-purple-300 pb-3 select-none">
          Installation
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Install{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-purple-700 font-semibold">
            go-set-mod
          </code>{" "}
          easily with this one-liner:
        </p>
        <pre className="bg-gray-900 text-green-400 rounded p-5 font-mono text-base overflow-x-auto mb-12 select-text">
          {`curl -fsSL https://raw.githubusercontent.com/ananay-nag/go-create-init-module/refs/heads/main/install.sh | bash`}
        </pre>

        <h2 className="text-4xl font-extrabold mb-6 border-b-4 border-purple-300 pb-3 select-none">
          Use Cases
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg mb-14">
          <li>
            <span className="font-semibold text-purple-600">
              Handling multiple nested Go modules
            </span>
          </li>
          <li>Precise module naming based on folder structure</li>
          <li>
            <span className="italic text-pink-600">
              Cross-platform consistency
            </span>{" "}
            targeting macOS, Linux, and Windows
          </li>
          <li>Teams automating module initialization to reduce setup errors</li>
        </ul>
      </article>

      <InstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

const featureItems = [
  {
    title: "Automates go mod init",
    description: "No need to run go mod init manually; it's automatic.",
    icon: <CheckCircleIcon className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "Project Root Detection",
    description: "Detects your project root via mod-name.yaml file.",
    icon: <CogIcon className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "Relative Path-Based Module Naming",
    description: "Generates module names based on relative directory paths.",
    icon: <CheckCircleIcon className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "Cross-Platform Support",
    description: "Works flawlessly on macOS, Linux, and Windows.",
    icon: <CheckCircleIcon className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "One-Line Installation",
    description: "Install quickly with a ready-to-run curl script.",
    icon: <TerminalIcon className="h-8 w-8 text-purple-500" />,
  },
];

const Features = () => (
  <section id="features" className="max-w-6xl mx-auto py-24 px-6">
    <motion.h2
      className="mb-12 text-5xl font-extrabold text-purple-900 text-center border-b-4 border-purple-300 pb-4 select-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Features
    </motion.h2>

    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {featureItems.map(({ title, description, icon }, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-lg shadow-md p-6 border border-purple-200 hover:shadow-xl transition cursor-default select-none"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-purple-800 mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      className="mt-16 overflow-x-auto rounded-md border border-purple-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <table className="min-w-full divide-y divide-purple-200 table-auto text-sm text-gray-800">
        <thead className="bg-purple-100 text-purple-900">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Feature</th>
            <th className="px-6 py-3 text-left font-semibold">Command</th>
            <th className="px-6 py-3 text-left font-semibold">Behavior</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-200">
          <tr className="bg-white hover:bg-purple-50">
            <td className="px-6 py-4">
              Initialize a module in a new subdirectory
            </td>
            <td className="px-6 py-4 font-mono text-purple-700">
              go-set-mod my-module
            </td>
            <td className="px-6 py-4">
              Creates a new folder and runs <code>go mod init</code> inside it.
            </td>
          </tr>
          <tr className="bg-purple-50 hover:bg-purple-100">
            <td className="px-6 py-4">
              Initialize the current directory as a module
            </td>
            <td className="px-6 py-4 font-mono text-purple-700">
              go-set-mod -c
            </td>
            <td className="px-6 py-4">
              Runs <code>go mod init</code> in current directory, no new folder
              created.
            </td>
          </tr>
          <tr className="bg-purple-50 hover:bg-purple-100">
            <td className="px-6 py-4">
              Initialize a new module with all auto config (mod-name.yaml, go-mod):
            </td>
            <td className="px-6 py-4 font-mono text-purple-700">
              go-set-mod -i module-name
            </td>
            <td className="px-6 py-4">
              Make Dir <code>mkdir module-name</code> in current directory, Init all like <code>go-set-mod -c</code>
            </td>
          </tr>
          <tr className="bg-white hover:bg-purple-50">
            <td className="px-6 py-4">Customizable module path prefix</td>
            <td className="px-6 py-4 font-mono text-purple-700">
              mod-name.yaml
            </td>
            <td className="px-6 py-4">
              Uses pre-set value to generate module paths.
            </td>
          </tr>
          <tr className="bg-purple-50 hover:bg-purple-100">
            <td className="px-6 py-4">
              Create a default mod-name.yaml if not exist
            </td>
            <td className="px-6 py-4 font-mono text-purple-700">
              mod-name.yaml
            </td>
            <td className="px-6 py-4">
              Creates a default <code>mod-name.yaml</code> if not present.
            </td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  </section>
);

const Examples = () => (
  <section id="examples" className="max-w-6xl mx-auto py-24 px-6">
    <motion.h2
      className="text-5xl font-extrabold mb-10 text-purple-900 border-b-4 border-purple-300 pb-3 select-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Examples &amp; CLI Usage
    </motion.h2>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <p>
        <span className="font-semibold">mod-name.yaml file</span>
      </p>
      <CodeBlock language="yaml">{`pre-set: "github.com/your-username"`}</CodeBlock>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <p>
        <span className="font-semibold">
          Create a new module in a subdirectory:
        </span>
      </p>
      <CodeBlock language="bash">{`go-set-mod my-module`}</CodeBlock>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <p>
        <span className="font-semibold">
          Initialize the current directory as a module:
        </span>
      </p>
      <CodeBlock language="bash">{`go-set-mod -c`}</CodeBlock>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <p>
        <span className="font-semibold">
          Initialize a new module with all auto config (mod-name.yaml, go-mod):
        </span>
      </p>
      <CodeBlock language="bash">{`go-set-mod -i <module-name>`}</CodeBlock>
    </motion.div>

    <motion.div
      className="mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-3xl font-bold mb-4">How It Works</h3>
      <ol className="list-decimal list-inside space-y-3">
        <li>
          Detects Project Root by locating <code>mod-name.yaml</code>
        </li>
        <li>Computes Relative Path from root to current directory</li>
        <li>
          Generates Correct Module Name using GitHub namespace and relative path
        </li>
        <li>
          Runs <code>go mod init</code> automatically
        </li>
      </ol>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="mt-20 border-t border-gray-300 py-6 text-center text-gray-600 text-sm select-none max-w-5xl mx-auto px-6">
    <p>
      <a
        href="https://github.com/ananay-nag/go-create-init-module"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-700 hover:underline"
      >
        GitHub Repository
      </a>{" "}
      | Version 1.0.3 | Made with ❤️ by <a
        href="https://github.com/ananay-nag"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:underline"
      > ananay-nag </a>
    </p>
  </footer>
);

const License = () => (
  <section id="features" className="max-w-6xl mx-auto py-24 px-6">
    <h2 className="text-4xl font-extrabold mb-6 border-b-4 border-purple-300 pb-3 select-none">
      License
    </h2>
    <p className="text-gray-700 text-lg">
      This project is licensed under the{" "}
      <strong className="text-purple-700">MIT License.</strong>
    </p>
  </section>
);
const Contribution = () => (
  <section id="features" className="max-w-6xl mx-auto py-24 px-6">
    <h2 className="text-4xl font-extrabold mb-6 border-b-4 border-purple-300 pb-3 select-none">
      Contribution
    </h2>
    <p className="text-gray-700 text-lg">
      Contributions welcome! Open issues or submit pull requests at the{" "}
      <a
        href="https://github.com/ananay-nag/go-create-init-module"
        className="text-pink-600 font-semibold underline hover:text-pink-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub repository
      </a>
      .
    </p>
  </section>
);

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <Features />
      <Examples />
      <License />
      <Contribution />
      <Footer />
    </>
  );
}
