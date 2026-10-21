import * as React from 'react';
import './App.css';

import {
  DocumentEditorContainerComponent,
  Toolbar,
  Ribbon
} from '@syncfusion/ej2-react-documenteditor';
import {
  DropDownListComponent
} from '@syncfusion/ej2-react-dropdowns';

import {
  ButtonComponent
} from '@syncfusion/ej2-react-buttons';

DocumentEditorContainerComponent.Inject(
  Toolbar,
  Ribbon
);

const hostUrl =
  'http://localhost:62870/api/documenteditor/';

function App() {

  const containerRef = React.useRef<any>(null);

  const [loaded, setLoaded] =
    React.useState(false);

  const [selectedFile, setSelectedFile] =
    React.useState('Getting Started50.docx');

  const componentStartRef =
    React.useRef<number>(0);

  const [metrics, setMetrics] =
    React.useState({
      componentLoad: 0,
      documentOpen: 0,
      download: 0,
      rtfExport: 0,
      htmlExport: 0,
      pdfExport: 0
    });

  const loadDocument =
    async (fileName: string) => {

      const start =
        performance.now();

      const response =
        await fetch(
          hostUrl +
          'LoadBenchmarkDocument',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify({
              fileName
            })
          }
        );

      if (response.status === 200) {

        const sfdt =
          await response.text();

        containerRef.current
          .documentEditor
          .open(sfdt);
      }
      else {

        console.error(
          'Document load failed',
          response.status
        );

        alert(
          `Document load failed (${response.status})`
        );
      }

      setMetrics(prev => ({
        ...prev,
        documentOpen:
          Math.round(
            performance.now() -
            start
          )
      }));
    };

  const loadData = async () => {

    if (!loaded) {

      componentStartRef.current =
        performance.now();

      setLoaded(true);

      return;
    }

    await loadDocument(selectedFile);
  };


  const resetData = () => {

    if (
      containerRef.current
    ) {

      containerRef.current
        .destroy();
    }

    setLoaded(false);

    setSelectedFile(
      'Getting Started50.docx'
    );

    setMetrics({
      componentLoad: 0,
      documentOpen: 0,
      download: 0,
      rtfExport: 0,
      htmlExport: 0,
      pdfExport: 0
    });
  };

  const downloadDocument = () => {

    if (
      !containerRef.current
    ) {
      return;
    }

    const start =
      performance.now();

    containerRef.current
      .documentEditor
      .save(
        'Document',
        'Docx'
      );

    setMetrics(prev => ({
      ...prev,
      download:
        Math.round(
          performance.now() - start
        )
    }));
  };

  const benchmarkRtf = async () => {
    const start = performance.now();

    const sfdt =
      containerRef.current
        .documentEditor
        .serialize();

    const response = await fetch(
      hostUrl + 'BenchmarkRtf',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: sfdt
        })
      });

    if (response.status === 200) {

      const blob = await response.blob();

      downloadBlob(
        blob,
        'Document.rtf'
      );

      setMetrics(prev => ({
        ...prev,
        rtfExport:
          Math.round(
            performance.now() - start
          )
      }));
    }
    else {

      console.error(
        'RTF export failed',
        response.status
      );
    }
  };

  const benchmarkHtml = async () => {
    const start = performance.now();

    const sfdt =
      containerRef.current
        .documentEditor
        .serialize();

    const response = await fetch(
      hostUrl + 'BenchmarkRtf',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: sfdt
        })
      });

    if (response.status === 200) {

      const blob = await response.blob();

      downloadBlob(
        blob,
        'Document.html'
      );

      setMetrics(prev => ({
        ...prev,
        htmlExport:
          Math.round(
            performance.now() - start
          )
      }));
    }
    else {

      console.error(
        'HTML export failed',
        response.status
      );
    }

  };


  const benchmarkPdf = async () => {
    const start = performance.now();

    const sfdt =
      containerRef.current
        .documentEditor
        .serialize();

    const response = await fetch(
      hostUrl + 'BenchmarkRtf',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: sfdt
        })
      });

    if (response.status === 200) {

      const blob = await response.blob();

      downloadBlob(
        blob,
        'Document.pdf'
      );

      setMetrics(prev => ({
        ...prev,
        pdfExport:
          Math.round(
            performance.now() - start
          )
      }));
    }
    else {

      console.error(
        'PDF export failed',
        response.status
      );
    }
  };
  const downloadBlob = (
    blob: Blob,
    fileName: string
  ) => {

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement('a');

    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
  };

  React.useEffect(() => {

    if (
      loaded &&
      containerRef.current
    ) {
      loadDocument(
        selectedFile
      );
    }

  }, [loaded]);

  return (
    <div className="benchmark-shell">

      <div className="toolbar-panel">

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>

          <DropDownListComponent
            width="180px"
            value={selectedFile || "Getting Started50.docx"}
            dataSource={[
              { text: '50 Pages', value: 'Getting Started50.docx' },
              { text: '100 Pages', value: 'Getting Started100.docx' },
              { text: '200 Pages', value: 'Getting Started200.docx' },
              { text: '500 Pages', value: 'Getting Started500.docx' }
            ]}
            fields={{
              text: 'text',
              value: 'value'
            }}
            change={(args: any) => {
              setSelectedFile(args.value);
            }}
          />

          <ButtonComponent
            cssClass="e-primary"
            onClick={loadData}>
            Load Data
          </ButtonComponent>

          <ButtonComponent
            onClick={resetData}>
            Reset
          </ButtonComponent>

          <ButtonComponent
            disabled={!loaded}
            onClick={downloadDocument}>
            Download
          </ButtonComponent>

          <ButtonComponent
            disabled={!loaded}
            onClick={benchmarkRtf}>
            Export RTF
          </ButtonComponent>

          <ButtonComponent
            disabled={!loaded}
            onClick={benchmarkHtml}>
            Export HTML
          </ButtonComponent>

          <ButtonComponent
            disabled={!loaded}
            onClick={benchmarkPdf}>
            Export PDF
          </ButtonComponent>

        </div>

      </div>

      <div className="editor-layout">

        <div className="editor-panel">

          {!loaded ? (

            <div className="empty-state">

              <img
                src="/images/empty-state.svg"
                alt="empty"
              />

              <div className="empty-state-text">
                Select a document size and click
                Load Data to start performance testing.
              </div>

            </div>

          ) : (

            <DocumentEditorContainerComponent
              id="container"
              ref={(scope: any) => {
                containerRef.current =
                  scope;
              }}
              serviceUrl={hostUrl}
              enableToolbar={true}
              toolbarMode="Ribbon"
              height="100%"
              created={() => {
                const inst = containerRef.current;

                if (inst && inst.documentEditor) {
                  inst.documentEditor.documentName =
                    'Getting Started';
                }

                const componentLoadTime =
                  Math.round(
                    performance.now() -
                    componentStartRef.current
                  );

                setMetrics(prev => ({
                  ...prev,
                  componentLoad:
                    componentLoadTime
                }));
              }}
            />

          )}

        </div>

        <div className="metrics-panel">

          <div className="metrics-header">
            Performance Metrics
          </div>

          <div className="metrics-body">

            <div className="metric-card">
              <div className="metric-name">
                Component Load
              </div>

              <div className="metric-value">
                {metrics.componentLoad} ms
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-name">
                Document Open
              </div>

              <div className="metric-value">
                {metrics.documentOpen} ms
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-name">
                Download
              </div>

              <div className="metric-value">
                {metrics.download} ms
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-name">
                RTF Export
              </div>

              <div className="metric-value">
                {metrics.rtfExport} ms
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-name">
                HTML Export
              </div>

              <div className="metric-value">
                {metrics.htmlExport} ms
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-name">
                PDF Export
              </div>

              <div className="metric-value">
                {metrics.pdfExport} ms
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;