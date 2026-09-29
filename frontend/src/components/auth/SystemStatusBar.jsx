export default function SystemStatusBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: 'var(--space-lg)',
      paddingTop: 'var(--space-md)',
    }}>
      <span style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: '#166534',
        boxShadow: '0 0 6px #6ffbbe'
      }} />
      <span style={{
        fontFamily: 'var(--font-label)',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-outline)'
      }}>
        Secure Institutional Gateway • All Systems Operational
      </span>
    </div>
  );
}
