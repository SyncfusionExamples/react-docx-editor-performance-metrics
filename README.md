# Syncfusion® React DOCX Editor – Performance Benchmark Sample

## Introduction

This sample demonstrates performance benchmarking scenarios using the Syncfusion® React DOCX Editor. It enables users to load benchmark documents of various sizes and measure key operations such as component initialization, document loading, document download, and export operations.

## Project Features

- Load predefined benchmark documents (50, 100, 200, and 500 pages).
- Measure component initialization performance.
- Measure document opening performance.
- Measure DOCX download performance.
- Measure RTF, HTML, and PDF export performance.
- View benchmark metrics directly within the application.


## How to Run the Sample

This sample consists of a React client application and an ASP.NET Core backend service. Both applications must be running.

### 1. Start the ASP.NET Core backend

Navigate to the server project directory and run:

```bash
dotnet run
```

### 2. Configure the service URL

Update the Document Editor service URL in:

```text
src/App.tsx
```

Example:

```text
http://localhost:<your-port>/api/documenteditor/
```

### 3. Install client dependencies

Navigate to the React project directory and run:

```bash
npm install
```

### 4. Start the React client

```bash
npm start
```

### 5. Open the application

Open the URL displayed in the terminal after the application starts.

## APIs Used

| API / Endpoint | HTTP Method | Purpose |
|---|---|---|
| `/api/documenteditor/LoadBenchmarkDocument` | POST | Loads benchmark documents and returns SFDT content. |
| `/api/documenteditor/BenchmarkRtf` | POST | Measures and performs RTF export operations. |
| `/api/documenteditor/BenchmarkHtml` | POST | Measures and performs HTML export operations. |
| `/api/documenteditor/BenchmarkPdf` | POST | Measures and performs PDF export operations. |

## Resources

- **Product page:** [Syncfusion React DOCX Editor](https://www.syncfusion.com/docx-editor-sdk/react-docx-editor?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples)
- **Documentation:** [Syncfusion React DOCX Editor - Documentation](https://help.syncfusion.com/document-processing/word/word-processor/react/overview?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples)
- **Online demo:** [Syncfusion React DOCX Editor - Online demo](https://document.syncfusion.com/demos/docx-editor/react/#/tailwind3/document-editor/default?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples)

## Support and feedback

For any other queries, reach our [Syncfusion support team](https://support.syncfusion.com/?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples) or post the queries through the [community forums](https://www.syncfusion.com/forums?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples). 

Request new feature through [Syncfusion feedback portal](https://www.syncfusion.com/feedback?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples). 

## License

This is a commercial product and requires a paid license for possession or use. Syncfusion's licensed software, including this component, is subject to the terms and conditions of [Syncfusion's EULA](https://www.syncfusion.com/license/studio/35.1.37/syncfusion_essential_studio_eula.pdf?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples). You can purchase a license [here](https://www.syncfusion.com/sales/products?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples) or start a free 30-day trial [here](https://www.syncfusion.com/account/manage-trials/start-trials?utm_source=github&utm_medium=listing&utm_campaign=github-github-documenteditor-examples).