import { cloneElement, createContext, useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';

const callAll =
  (...fns: Function[]) =>
  (...args: Function[]) =>
    fns.forEach((fn) => fn && fn(...args));

type ModalContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal(props: React.PropsWithChildren<{}>) {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({
  children: child,
}: React.PropsWithChildren<{ children: React.ReactElement }>) {
  const [, setIsOpen] = useContext(ModalContext)!;
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({
  children: child,
}: React.PropsWithChildren<{ children: React.ReactElement }>) {
  const [, setIsOpen] = useContext(ModalContext)!;
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props: any) {
  const [isOpen, setIsOpen] = useContext(ModalContext)!;
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} {...props}>
      {props.children}
    </Dialog>
  );
}

interface ModalContentsProps
  extends React.PropsWithChildren<{
    title: string;
  }> {}

function ModalContents({ title, children, ...props }: ModalContentsProps) {
  return (
    <ModalContentsBase {...props}>
      <div className="flex justify-end">
        <ModalDismissButton>
          <button className="py-3 px-3 ">x</button>
        </ModalDismissButton>
      </div>
      <h3 className="text-center font-bold">{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
