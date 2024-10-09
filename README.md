# **BlendXSync: Thesis-Based Real-Time Synchronization of Textual and Graphical DSLs**

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## **Overview**

**BlendXSync** is an implementation developed as part of my thesis, **"Implementation of a Mechanism for Automatic Transformation and Synchronization of Textual and Graphical Domain-Specific Languages (DSLs)."** This project is specifically focused on enabling real-time transformation and synchronization between textual and graphical DSLs. **BlendXSync** is not a low-code platform by itself, but it works alongside the **Locsys** platform, which provides a low-code environment to support these synchronization mechanisms.

While **Locsys** facilitates low-code development, **BlendXSync** powers the seamless two-way synchronization between textual and graphical representations, ensuring that changes in one format are immediately reflected in the other. This approach enables users to leverage the precision of textual DSLs while enjoying the usability of graphical models, making it a versatile tool for both technical and non-technical users.

**BlendDSL**, the domain-specific language framework powering this implementation, will have its own repository, separate from **BlendXSync**. In this repository, **BlendXSync** will focus on implementing the synchronization mechanisms built on top of **BlendDSL**.

---

## **Context of Development**

**BlendXSync** is built as part of my research and is closely integrated with the **Locsys** platform, a low-code environment developed to support automatic transformation between DSL formats. The real-time synchronization mechanisms implemented in **BlendXSync** are derived from my thesis and continue to evolve based on ongoing research.

This repository focuses solely on the synchronization logic between textual and graphical models, whereas **BlendDSL**, the DSL framework that powers this mechanism, will be housed in a separate repository. The two repositories will be interconnected, with **BlendXSync** utilizing the **BlendDSL** for the transformation logic.

---

## **Key Features of BlendXSync**

As **BlendXSync** is built to enhance model-driven development through real-time synchronization, the following features are central to its functionality:

- **Two-Way Real-Time Synchronization:** Instant updates between textual and graphical DSL representations. Changes in one format are mirrored in the other without delay.
- **Integration with Locsys:** While **BlendXSync** handles the synchronization, **Locsys** provides a low-code environment that simplifies model creation and modification without coding.
- **Extensibility via BlendDSL:** **BlendXSync** supports various DSLs through **BlendDSL**, which allows JSON schema-based transformations for flexible use cases.
- **Thesis-Based Synchronization Mechanisms:** The transformation logic embedded in **BlendXSync** is based on the methodology proposed in my thesis, ensuring that the system remains academically sound and effective.

---

## **Installation**

To use **BlendXSync**, follow these instructions:

### **Prerequisites**
- **Node.js** (>=14.x.x) and **npm** (>=6.x.x) are required.
- **React** (>=17.x.x) for rendering the graphical interface.
- A modern web browser to view and interact with the system.

### **Clone the Repository**

```bash
git clone https://github.com/chryskoum/BlendXSync.git
cd BlendXSync
```

### **Install Dependencies**

```bash
npm install
```

### **Start the Application**

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser to access the graphical interface of **BlendXSync**.

---

## **Usage**

As **BlendXSync** evolves, users will be able to perform the following tasks within the platform:

1. **Switch Between Textual and Graphical Representations:**
   - Modify a DSL in text format, and see the graphical representation update instantly.
   - Similarly, adjust elements in the graphical view, and the textual DSL will be synchronized automatically.
   
2. **Define New DSLs (via BlendDSL):**
   - Using **BlendDSL**, which will be housed in a separate repository, users can define new DSLs by creating JSON files that describe the transformation logic between textual and graphical models.

3. **Export Models:**
   - Export created or modified models in either textual or graphical formats for further use.

---

## **Supported and Planned DSLs (via BlendDSL)**

- **Robot DSL:** For defining robotic behaviors.
- **State Machine DSL:** For modeling states and transitions in systems.
- **SmAuto DSL:** A smart environment automation language integrated with **Locsys**.
- **GoalDSL:** For goal-driven Cyber-Physical Systems (CPS) modeling.
- **dflow DSL:** Currently under development.

---

## **Roadmap**

The roadmap for **BlendXSync** includes the following milestones:

- [ ] Complete the full integration of synchronization mechanisms from my thesis.
- [ ] Develop a user-friendly UI/UX based on this [Figma Prototype](https://www.figma.com/proto/EVeo0L4qGX6TTeaARZ6SqV/Thesis?page-id=0%3A1&node-id=2-12&node-type=frame&viewport=492%2C353%2C0.15&t=TlOXUu637uUaEF6q-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A12).
- [ ] Ensure seamless integration between **BlendXSync** and **BlendDSL** for managing multiple DSLs.
- [ ] Add more customization options for graphical model representations.
- [ ] Extend the CI/CD pipeline for automated testing and deployment.

---

## **BlendDSL Repository**

**[BlendDSL](https://github.com/ChrysKoum/Blend-DSL/tree/main)**, the core language framework used in **BlendXSync**, will be hosted in a separate repository. This allows for independent development and evolution of the DSL framework while keeping the focus of **BlendXSync** on synchronization and transformation mechanisms. The **BlendDSL** repository will include support for creating and managing domain-specific languages through JSON schema-based transformations.

Once **BlendDSL** is released, users will be able to define their own DSLs and integrate them with **BlendXSync** for real-time synchronization between textual and graphical models.

---

## **License**

This project is licensed under the **MIT License**. For more information, see the [LICENSE](LICENSE) file.

---

## **Contact**

For questions, contributions, or further clarification, feel free to open an issue in the repository or contact me directly:

- **Author:** Chrysostomos Koumides
- **Email:** blendme.dsl@gmail.com
