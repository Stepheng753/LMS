import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_2_Databases() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.2 • Full Stack Design"
        title="Databases & Tables"
        summary="Where an app keeps its data, what a table can hold, and how to decide which data belongs in which table."
      />

      <p>
        A <strong>database</strong> is where an app stores information so that it is still there tomorrow. Close the
        browser, restart the computer, and the data survives. We use <strong>SQLite</strong>, which keeps the whole
        database in a single file ending in <code>.db</code>. There is no separate server to run and nothing to install
        beyond a viewer.
      </p>

      <Section title="A table is a spreadsheet" />
      <p>
        If you have used Excel, you already understand a table. A database holds one or more tables. Each table is a
        grid with <strong>columns</strong> (the kinds of information) and <strong>rows</strong> (one record each).
      </p>
      <Table
        caption="Table: tasks"
        headers={['id', 'title', 'done', 'due_date', 'category_id']}
        rows={[
          ['1', 'Buy milk', '0', '2026-10-15', '1'],
          ['2', 'Book dentist', '1', '2026-10-20', '2'],
          ['3', 'Call mum', '0', 'NULL', '2'],
        ]}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li>The <strong>table</strong> is named after the kind of thing it holds, in the plural: <code>tasks</code>.</li>
        <li>Each <strong>column</strong> has a fixed name and type of value.</li>
        <li>Each <strong>row</strong> is one task. Add a task, and you add a row.</li>
      </ul>

      <Section title="What values can a column hold?" />
      <p>SQLite has five basic kinds of value:</p>
      <Table
        headers={['Type', 'Holds', 'Examples']}
        rows={[
          [<code key="a">INTEGER</code>, 'Whole numbers', '1, 42, -7'],
          [<code key="b">REAL</code>, 'Numbers with decimals', '19.99, 3.14'],
          [<code key="c">TEXT</code>, 'Words and any text', '"Buy milk"'],
          [<code key="d">BLOB</code>, 'Raw files like images (rarely used directly)', 'a photo'],
          [<code key="e">NULL</code>, 'Nothing / unknown', 'a task with no due date'],
        ]}
      />
      <Callout type="info" title="No true/false or date type">
        SQLite stores yes/no as <code>0</code> and <code>1</code> (0 means no, 1 means yes), and dates as text in the
        form <code>2026-10-15</code>. Your backend translates them to <code>true/false</code> and real dates for the
        frontend.
      </Callout>

      <Section title="Rules a column can have" />
      <Table
        headers={['Rule', 'Meaning']}
        rows={[
          [<code key="a">PRIMARY KEY</code>, 'A unique id for each row. No two rows share one and it never changes'],
          [<code key="b">NOT NULL</code>, 'The column must always have a value'],
          [<code key="c">UNIQUE</code>, 'No two rows may repeat this value (for example an email address)'],
          [<code key="d">DEFAULT</code>, 'The value used when none is given (for example done = 0)'],
        ]}
      />
      <p>
        You will see <code>id</code> in nearly every table. It is the row&apos;s permanent name. You would not identify
        a person by their title, so you do not identify a row by its content either.
      </p>

      <Section title="One table or two? Separating data" />
      <p>
        The most important design question in a database is: <em>which data belongs in which table?</em> A good
        rule of thumb is <strong>one table per kind of thing</strong>. Tasks are one kind of thing. Categories (like
        &quot;Home&quot; and &quot;Work&quot;) are another.
      </p>

      <Compare
        goodLabel="Two tables"
        badLabel="One crowded table"
        good={
          <>
            <p><strong>categories</strong>: id, name</p>
            <p><strong>tasks</strong>: id, title, done, category_id</p>
            <p>Rename a category once and every task updates.</p>
          </>
        }
        bad={
          <>
            <p><strong>tasks</strong>: id, title, done, category_name, category_color</p>
            <p>&quot;Home&quot; typed in 50 rows. One typo and you have &quot;Hoem&quot; as a category.</p>
          </>
        }
      />

      <Section title="Linking tables: foreign keys" />
      <p>
        When tasks belong to categories, we do not copy the category into every task. We store the category&apos;s{' '}
        <code>id</code> in the task. A column that stores another table&apos;s id is a{' '}
        <Term definition="A column whose value is the primary key of a row in another table. It is how tables are linked.">foreign key</Term>.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Table
          caption="categories"
          headers={['id', 'name']}
          rows={[
            ['1', 'Home'],
            ['2', 'Family'],
          ]}
        />
        <Table
          caption="tasks"
          headers={['id', 'title', 'category_id']}
          rows={[
            ['1', 'Buy milk', '1'],
            ['2', 'Call mum', '2'],
            ['3', 'Fix the tap', '1'],
          ]}
        />
      </div>
      <p>
        Read it like this: &quot;Buy milk&quot; has <code>category_id</code> 1, and category 1 is &quot;Home&quot;.
        This is a <strong>one-to-many</strong> relationship: one category has many tasks, and each task has one
        category.
      </p>

      <Callout type="tip" title="Three questions for deciding">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Am I typing the same value over and over in many rows? It probably wants its own table.</li>
          <li>Does this thing have details of its own (a name, a colour, a date)? Give it a table.</li>
          <li>Can one of these belong to <em>many</em> of the other? Put the foreign key on the &quot;many&quot; side.</li>
        </ol>
      </Callout>

      <Section title="What about SQL?" />
      <p>
        <strong>SQL</strong> is the language used to ask a database for things. Your backend speaks it constantly, and
        your AI helper writes it. You will not type any. To look at data, you will just click a table in a viewer, which
        shows it as a grid, like a spreadsheet. We set that up in the next step.
      </p>

      <Exercise
        title="Design the tables"
        hint={<p>Look for repeated values and for things that have details of their own.</p>}
        solution={
          <div className="space-y-2">
            <p><strong>authors</strong>: id, name</p>
            <p><strong>books</strong>: id, title, year, read (0 or 1), author_id</p>
            <p>
              One author has many books (one-to-many), so <code>author_id</code> goes in <code>books</code>. Authors are
              kept separate so each name is stored once.
            </p>
          </div>
        }
      >
        <p>
          You are building a reading-list app that tracks books, their authors, the year, and whether you have read
          them. What tables would you create, and which columns go in each?
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What stores a yes/no value in SQLite?"
          options={['A BOOL column', 'The numbers 0 and 1', 'The word "yes"', 'A BLOB']}
          correctIndex={1}
          explanation="SQLite has no true boolean. 0 means no and 1 means yes."
        />
        <Quiz
          question="In a tasks table, the column category_id holds the id of a row in the categories table. What is it called?"
          options={['A primary key', 'A foreign key', 'A blob', 'A default']}
          correctIndex={1}
          explanation="A column that points at another table's primary key is a foreign key."
        />
        <Quiz
          question="You notice the word 'Work' typed in 200 task rows. What does that suggest?"
          options={['Nothing', 'Make it a separate table and link to it', 'Use BLOB', 'Make it NULL']}
          correctIndex={1}
          explanation="Repeated values are a sign they deserve their own table, linked by a foreign key."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A database holds tables. A table is a grid of columns (kinds of info) and rows (records).',
          'SQLite values: INTEGER, REAL, TEXT, BLOB and NULL. Yes/no is 0/1 and dates are text.',
          'Every table gets an id primary key.',
          'One table per kind of thing. Link them with a foreign key stored on the "many" side.',
          'You will browse data in a viewer, not write SQL.',
        ]}
      />
    </div>
  );
}
