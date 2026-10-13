import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { ToolkitDownloads } from '../../../../components/content/ToolkitDownloads';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TOOLBOX, TOOLBOX_ZIP_README } from '../../toolbox/registry';

export default function StepT_0_Downloads() {
  return (
    <div>
      <StepHeader
        eyebrow="Toolbox • Download"
        title="Download Your Money Toolbox"
        summary="Spreadsheets and worksheets you can keep: a budget, a debt list, an emergency fund tracker, a net worth sheet, a retirement number worksheet and more."
      />

      <p>
        These are the working files behind the course. Download the whole zip, or pick the ones you need. The
        spreadsheets open in Excel or Google Sheets. The worksheets are plain text you can print.
      </p>

      <Callout type="success" title="Start with three">
        If you only use three: the <strong>monthly budget</strong>, the <strong>debt snowball list</strong> and the
        <strong> order of operations card</strong>. Together they cover where the money is, what you owe, and where the next dollar goes.
      </Callout>

      <ToolkitDownloads
        items={TOOLBOX}
        extras={[{ zipPath: 'README.txt', text: TOOLBOX_ZIP_README }]}
        zipName="money-toolbox.zip"
      />

      <Section title="Nothing is uploaded" />
      <p>
        The files are built in your browser. They hold no personal information until you type your own numbers into them
        on your own computer.
      </p>

      <KeyTakeaways
        items={[
          'Eleven files: five spreadsheets and six worksheets, in one zip.',
          'Open the .csv files in Excel or Google Sheets. Print the text worksheets.',
          'Start with the budget, the debt list and the order of operations card.',
        ]}
      />
    </div>
  );
}
