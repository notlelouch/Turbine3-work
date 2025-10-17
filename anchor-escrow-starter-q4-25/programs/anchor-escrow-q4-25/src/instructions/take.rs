#![allow(unused_imports)]

use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        close_account, transfer_checked, CloseAccount, Mint, TokenAccount, TokenInterface,
        TransferChecked,
    },
};

use crate::Escrow;

#[derive(Accounts)]
pub struct Take<'info> {
    #[account(mut)]
    pub taker: Signer<'info>,

    #[account(mut)]
    pub maker: Signer<'info>,

    #[account(
        mint::token_program = token_program
        )]
    pub mint_a: InterfaceAccount<'info, Mint>,

    #[account(
        mint::token_program = token_program
        )]
    pub mint_b: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint_b,
        associated_token::authority = taker,
        associated_token::token_program = token_program
        )]
    pub taker_ata_b: InterfaceAccount<'info, TokenAccount>,

    #[account(
    init_if_needed,
    payer = taker,
    associated_token::mint = mint_b,
    associated_token::authority = maker,
    associated_token::token_program = token_program
)]
    pub maker_ata_b: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"vault", maker.key().as_ref(), escrow.seed.to_le_bytes().as_ref()],
        bump
        )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"escrow", maker.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump
        )]
    pub escrow: Account<'info, Escrow>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

// impl<'info> Take<'info> {
//      TODO: Implement Take Instruction
//      Includes Deposit, Withdraw and Close Vault
// }
